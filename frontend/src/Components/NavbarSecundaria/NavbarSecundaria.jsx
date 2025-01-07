import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarSecundaria = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="btn btn-outline-primary me-3"
          onClick={() => navigate("/")}
        >
          Página Inicial
        </button>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold active" : ""}`
              }
            >
              Perfil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/criaranuncios"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold active" : ""}`
              }
            >
              Criação de Anúncios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/buscaanuncios"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold active" : ""}`
              }
            >
              Buscar Anúncios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/meusanuncios"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold active" : ""}`
              }
            >
              Meus Anúncios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/chats"
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold active" : ""}`
              }
            >
              Chat
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarSecundaria;
