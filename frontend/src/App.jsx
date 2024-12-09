import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Chat from "./Pages/Chat/Chat";

// Componente principal da aplicação, responsável por gerenciar as rotas.
// O componente Router fornece o contexto de roteamento para a aplicação.
const App = () => {
  return (
    <Router> 
      <div>
        <Routes>
          {/* Rota para a página inicial ("/"). */}
          <Route
            path="/"
            element={
              <>
                {/* Composição de componentes que formam a página inicial. */}
                <Navbar />
                <Hero />
                <Destaque />
                <Categorias />
                <Chamada />
                <Rodape />
              </>
            }
          />
          {/* Rota das demais páginas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/criaranuncios" element={<Criacao />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/buscaanuncios" element={<BuscaAnuncios />} />
          <Route path="/meusanuncios" element={<MeusAnuncios />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
