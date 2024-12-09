import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Chat = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      participant: "João Silva",
      adTitle: "Smartphone Samsung Galaxy S21",
      messages: [
        {
          sender: "Você",
          text: "Olá, o produto ainda está disponível?",
          timestamp: "10:00",
        },
        {
          sender: "João Silva",
          text: "Sim, está disponível!",
          timestamp: "10:05",
        },
      ],
    },
    {
      id: 2,
      participant: "Maria Oliveira",
      adTitle: "Notebook Dell Inspiron",
      messages: [
        { sender: "Você", text: "O preço é negociável?", timestamp: "09:00" },
      ],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [newChat, setNewChat] = useState({ email: "", adTitle: "" }); // Dados do novo chat

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [
        ...selectedConversation.messages,
        {
          sender: "Você",
          text: newMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ];

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, messages: updatedMessages }
            : conv
        )
      );

      setSelectedConversation({
        ...selectedConversation,
        messages: updatedMessages,
      });

      setNewMessage(""); // Limpa o campo
    }
  };

  const handleNewChat = () => {
    if (newChat.email && newChat.adTitle) {
      const newConversation = {
        id: conversations.length + 1,
        participant: newChat.email,
        adTitle: newChat.adTitle,
        messages: [],
      };

      setConversations((prev) => [...prev, newConversation]);
      setShowModal(false); // Fecha o modal
      setNewChat({ email: "", adTitle: "" }); // Reseta o formulário
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Lista de Conversas */}
        <div className="col-md-4">
          <h4>
            Suas Conversas
            <button
              className="btn btn-sm btn-success float-end"
              onClick={() => setShowModal(true)}
            >
              Iniciar Chat
            </button>
          </h4>
          <div className="list-group">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`list-group-item list-group-item-action ${
                  selectedConversation.id === conversation.id ? "active" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <h6 className="mb-1">{conversation.participant}</h6>
                <p className="mb-1 text-truncate">{conversation.adTitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes da Conversa */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>{selectedConversation.participant}</h5>
              <p className="mb-0 text-muted">
                Anúncio: {selectedConversation.adTitle}
              </p>
            </div>
            <div
              className="card-body"
              style={{ height: "400px", overflowY: "auto" }}
            >
              {selectedConversation.messages.map((msg, index) => (
                <div key={index} className="mb-3">
                  <strong>{msg.sender}</strong>{" "}
                  <span className="text-muted small">{msg.timestamp}</span>
                  <p className="mb-0">{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSendMessage}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Iniciar Novo Chat */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Iniciar Novo Chat</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">E-mail do Usuário</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newChat.email}
                      onChange={(e) =>
                        setNewChat({ ...newChat, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Título do Anúncio</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newChat.adTitle}
                      onChange={(e) =>
                        setNewChat({ ...newChat, adTitle: e.target.value })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNewChat}
                >
                  Criar Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
