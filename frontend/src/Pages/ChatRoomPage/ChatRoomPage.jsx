import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChatRoomPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { chatRoomId } = useParams(); 
  const messageEndRef = useRef(null);

  const hubUrl = `http://localhost:5327/chat/advertisement?chatRoomId=${chatRoomId}`;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const AccessToken = localStorage.getItem("AccessToken");
      if (!AccessToken) {
        return;
      }

      try {
        const response = await fetch("http://localhost:5327/accounts", {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }

        const userData = await response.json();
        setUser(userData); 
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => localStorage.getItem("AccessToken"),
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    hubConnection.on("ReceiveHistory", (historyMessages) => {
      console.log("History messages received:", historyMessages);
      setMessages(historyMessages);
    });

    hubConnection.on("ReceiveMessage", (newMessage) => {
      console.log("New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    hubConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        hubConnection
          .invoke("ConnectToChat", chatRoomId, user.id)
          .then(() => {
            console.log("User connected to the chat room");
          })
          .catch((err) => {
            console.error("Error during connection: ", err);
          });
      })
      .catch((err) => {
        console.error("SignalR connection error:", err);
      });

    setConnection(hubConnection);

    return () => {
      if (hubConnection) {
        hubConnection
          .stop()
          .then(() => console.log("SignalR connection stopped"))
          .catch((err) =>
            console.error("Error stopping SignalR connection:", err)
          );
      }
    };
  }, [user, chatRoomId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !connection) return;

    try {
      await connection.invoke(
        "SendMessageToChat",
        chatRoomId,
        newMessage,
        user.id
      );
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Sala de Bate-papo</h1>
          <div className="card shadow-sm mb-4">
            <div className="card-body overflow-auto" style={{ height: "400px" }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex mb-3 ${
                    msg.messageOwnerId === user?.id ? "justify-content-end" : "justify-content-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded shadow-sm ${
                      msg.messageOwnerId === user?.id
                        ? "bg-primary text-white"
                        : "bg-success text-white"
                    }`}
                  >
                    <p className="mb-1 fw-bold">{msg.messageOwnerName}</p>
                    <p className="mb-0">{msg.content}</p>
                    <small className="text-light d-block mt-2">
                      {moment.utc(msg.sentAt).local().fromNow()}
                    </small>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite a sua mensagem..."
              className="form-control"
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
