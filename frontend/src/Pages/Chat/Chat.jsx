import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ChatPage() {
    const [user, setUser] = useState(null);
    const [myChats, setMyChats] = useState([]);
    const [myAdvertisementsChats, setMyAdvertisementsChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userApiUrl = `http://localhost:5327/accounts`;
    const myChatsApiUrl = `http://localhost:5327/chats/my-chats`;
    const myAdvertisementsChatsApiUrl = `http://localhost:5327/chats/my-advertisements`;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const AccessToken = localStorage.getItem("AccessToken");
                if (!AccessToken) {
                    return;
                }

                const response = await axios.get(userApiUrl, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                });
                setUser(response.data);
            } catch (err) {
                console.error("Failed to fetch user details:", err);
                setError("Failed to load user details. Please try again later.");
            }
        };

        fetchUserDetails();
    }, [navigate]);

    // Fetch chats after user is set
    useEffect(() => {
        if (!user) return; // Wait for the user to be set

        const fetchChats = async () => {
            try {
                const AccessToken = localStorage.getItem("AccessToken");
                if (!AccessToken) {
                    return;
                }

                const myChatsResponse = await axios.get(myChatsApiUrl, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                    params: { accountId: user.id, page: 1, pageSize: 10 },
                });

                const myAdvertisementsChatsResponse = await axios.get(myAdvertisementsChatsApiUrl, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                    params: { accountId: user.id, page: 1, pageSize: 10 },
                });

                setMyChats(myChatsResponse.data.data);
                setMyAdvertisementsChats(myAdvertisementsChatsResponse.data.data);
            } catch (err) {
                console.error("Failed to fetch chats:", err);
                setError("Failed to load chats. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [user, navigate]);

    if (loading) {
        return <div className="text-center mt-10">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <>
            <div className="min-vh-100 bg-light py-5">
                <div className="container">
                    {user && (
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h2 className="card-title h4">Informação do usuário</h2>
                                <p className="text-muted mb-1"><strong>ID:</strong> {user.id}</p>
                                
                                <p className="text-muted mb-1"><strong>Email:</strong> {user.email}</p>
                                
                            </div>
                        </div>
                    )}
    
                    <h1 className="text-center display-4 mb-5">Chats</h1>
    
                    <div className="mb-5">
                        <h2 className="h3 mb-4">Meus Chats</h2>
                        {myChats.length === 0 ? (
                            <p className="text-muted">Nenhum chat encontrado.</p>
                        ) : (
                            <div className="row g-4">
                                {myChats.map((chat) => (
                                    <div className="col-md-4" key={chat.chat_room_id}>
                                        <Link to={`/chat-room/${chat.chat_room_id}`} className="text-decoration-none">
                                            <div className="card shadow-sm h-100">
                                                <div className="card-body">
                                                    <h5 className="card-title text-dark">{chat.advertisement.title}</h5>
                                                    <p className="card-text text-muted mb-1">
                                                        <strong>Tipo:</strong> {chat.advertisement.type}
                                                    </p>
                                                    <p className="card-text text-muted mb-1">
                                                        <strong>Categoria:</strong> {chat.advertisement.category_name}
                                                    </p>
                                                    <p className="card-text text-muted mb-1">
                                                        <strong>Anunciante:</strong> {chat.advertisement.owner.owner_name}
                                                    </p>
                                                    <p className="card-text text-muted mb-0">
                                                        <strong>Initiado por:</strong> {new Date(chat.initiated_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
    
                    <div>
                        <h2 className="h3 mb-4">Chats dos meus anúncios</h2>
                        {myAdvertisementsChats.length === 0 ? (
                            <p className="text-muted">Nenhum chat encontrado.</p>
                        ) : (
                            <div className="row g-4">
                                {myAdvertisementsChats.map((chat) => (
                                    <div className="col-md-4" key={chat.chat_room_id}>
                                        <Link to={`/chat-room/${chat.chat_room_id}`} className="text-decoration-none">
                                            <div className="card shadow-sm h-100">
                                                <div className="card-body">
                                                    <h5 className="card-title text-dark">{chat.advertisement.title}</h5>
                                                    <p className="card-text text-muted mb-1">
                                                        <strong>Tipo:</strong> {chat.advertisement.type}
                                                    </p>
                                                    <p className="card-text text-muted mb-1">
                                                        <strong>Categoria:</strong> {chat.advertisement.category_name}
                                                    </p>
                                                    <p className="card-text text-muted mb-1">
                                                        <strong>Iniciado por:</strong> {chat.sender_id}
                                                    </p>
                                                    <p className="card-text text-muted mb-0">
                                                        <strong>Iniciado em:</strong> {new Date(chat.initiated_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
    
}
