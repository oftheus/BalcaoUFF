import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import brasao from "../../assets/brasao.png";
import { useAuthContext, clearTokens, handleLogout } from "../../authConfig";

const Navbar = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const auth = useAuthContext(); // Hook para obter o contexto de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(auth?.isAuthenticated);
  //Estado para controlar se a navbar deve ser sticky com base no scroll
  const [sticky, setSticky] = useState(false);

  // useEffect que adiciona um listener de evento para monitorar o scroll da janela
  useEffect(() => {
    //adiciona um evento de scroll na janela
    window.addEventListener("scroll", () => {
      // Define o estado sticky com base na posição do scroll vertical
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  }, []); //Array de dependências vazio para executar apenas no carregamento inicial

  // Atualiza o estado de autenticação sempre que ele muda
  useEffect(() => {
    setIsAuthenticated(auth?.isAuthenticated);
  }, [auth?.isAuthenticated]);

  const handleLogoutClick = async () => {
    await handleLogout(auth);
    setIsAuthenticated(false); // Atualiza manualmente para refletir o logout
  };

  const handleLogin = () => {
    auth.signinRedirect(); // Redireciona para a página de login
  };

  const handleAnunciarGratis = () => {
    navigate("/dashboard"); // Navega para a página de criação de anúncios
  };

  return (
    // Contêiner principal da navbar
    // Aplica a classe 'navbar-escura' dinamicamente se o estado "sticky" for verdadeiro
    <nav className={`container-fluid ${sticky ? "navbar-escura" : ""}`}>
      <img src={brasao} alt="Brasão UFF" className="brasao" />
      <ul>
        {isAuthenticated ? (
          <>
            <li>Bem-vindo, {auth.user?.profile.email}</li>
            <li>
              <button onClick={handleLogoutClick} className="botao2">
                Sair
              </button>
            </li>
            <li>
              <button onClick={handleAnunciarGratis} className="botao2">
                Anunciar grátis
              </button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogin} className="botao2">
              Entrar
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
