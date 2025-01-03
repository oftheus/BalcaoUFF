import React, { useEffect, useState, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const ChatApp = ({ advertisementId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const chatHubRef = useRef(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5327/chat/advertisement`, {
        query: { advertisementId, userId },
        withCredentials: true,
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to SignalR");

        connection.on("ReceiveHistory", (historyMessages) => {
          console.log("History messages received:", historyMessages);
          setMessages(historyMessages);
        });

        connection.on("ReceiveMessage", (newMessage) => {
          console.log("New message received:", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        connection.invoke("ConnectToChat", advertisementId, userId)
          .then(() => {
            console.log("User connected to the chat room");
          })
          .catch((err) => {
            console.error("Error during connection: ", err);
          });

        chatHubRef.current = connection;
      })
      .catch((err) => {
        console.error("SignalR connection error:", err);
      });

    return () => {
      if (chatHubRef.current) {
        chatHubRef.current.stop()
          .then(() => console.log("SignalR connection stopped"))
          .catch((err) => console.error("Error stopping SignalR connection:", err));
      }
    };
  }, [advertisementId, userId]); 

  const handleSendMessage = async () => {
    if (message.trim() && chatHubRef.current) {
      try {
        
        await chatHubRef.current.invoke("SendMessageToChat", advertisementId, message, userId);
        setMessage(""); 
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  return (
    <div>
      <h1>Sala de Bate-papo</h1>
      <div>
        {messages.length > 0 ? (
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.MessageOwnerName}: </strong>{msg.Content} <em>{new Date(msg.SentAt).toLocaleString()}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet. Be the first to send a message!</p>
        )}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
