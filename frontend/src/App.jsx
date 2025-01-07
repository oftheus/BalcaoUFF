import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Destaque from "./Components/Destaque/Destaque";
import Categorias from "./Components/Categorias/Categorias";
import Chamada from "./Components/Chamada/Chamada";
import Rodape from "./Components/Rodape/Rodape";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Criacao from "./Pages/Criacao/Criacao";
import Perfil from "./Pages/Perfil/Perfil";
import BuscaAnuncios from "./Pages/BuscaAnuncios/BuscaAnuncios";
import MeusAnuncios from "./Pages/MeusAnuncios/MeusAnuncios";
import ChatPage from "./Pages/Chat/Chat";
import Protected from "./Components/Protected/Protected";
import Registration from "./Pages/Registro/Registro";
import { saveTokens } from "./authConfig";
import Logout from "./Pages/Logout/Logout";
import NavbarSecundaria from "./Components/NavbarSecundaria/NavbarSecundaria";
import ChatRoomPage from "./Pages/ChatRoomPage/ChatRoomPage";

const MainPage = () => (
  <>
    <Navbar />
    <Hero />
    <Destaque />
    <Categorias />
    <Chamada />
    <Rodape />
  </>
);

const AppRoutes = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLogoutPage = location.pathname === "/logout";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasAuthParams = params.has("code") && params.has("state");

    const handleAuthentication = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        if (!token) {
          console.error("Token não encontrado. Aguardando salvamento...");
          return;
        }

        const response = await fetch("http://localhost:5327/accounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.log("Conta não encontrada. Redirecionando para cadastro.");
          navigate("/register");
        } else if (response.ok) {
          console.log("Conta encontrada. Redirecionando para o dashboard.");
          navigate("/dashboard");
        } else {
          console.error("Erro inesperado:", response.status);
        }
      } catch (error) {
        console.error("Erro ao verificar conta:", error.message);
      }
    };

    if (auth?.isAuthenticated && hasAuthParams) {
      saveTokens(auth);
      handleAuthentication();
    }
  }, [auth?.isAuthenticated, location.search, navigate]);

  return (
    <>
      {!isLogoutPage && (isHomePage ? <Navbar /> : <NavbarSecundaria />)}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/register" element={<Registration />} />
        <Route path="/criaranuncios" element={<Criacao />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/buscaanuncios" element={<BuscaAnuncios />} />
        <Route path="/meusanuncios" element={<MeusAnuncios />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/chat-room/:chatRoomId" element={<ChatRoomPage />} />
        <Route path="/silent-renew" element={<div>Silent Renew</div>} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

const App = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      saveTokens(auth);
      console.log("Tokens após login:", localStorage.getItem("AccessToken"));
    }
  }, [auth?.isAuthenticated]);

  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
