import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpa todos os tokens do localStorage
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("refreshToken");
    
    localStorage.removeItem("oidc.60fcf14cef5d441f9f306d3a7d9bf5db");

    // Redireciona para a página inicial após alguns segundos
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

  return <div>Você foi desconectado. Redirecionando...</div>;
};

export default Logout;
