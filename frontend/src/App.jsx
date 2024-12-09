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

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Destaque />
                <Categorias />
                <Chamada />
                <Rodape />
              </>
            }
          />
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
