import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  // Hook do React Router para navegar entre as rotas.
  const navigate = useNavigate();

  // Função genérica para navegação.
  // Recebe um caminho como argumento e navega até ele.
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Função específica para navegar para a página de criação de anúncios.
  const irParaCriarAnuncios = () => {
    navigate("/criaranuncios");
  };

  // Retorna a interface do componente Dashboard.
  return (
    <Container className="dashboard-container">
      <h2 className="mb-4">Bem-vindo!</h2>

      <Row>
        <Card
          className="dashboard-card"
          onClick={() => handleNavigation("/perfil")} // Navega para a rota de perfil.
        >
          <Card.Body>
            <Card.Title>Perfil</Card.Title>
            <Card.Text>Veja suas informações pessoais.</Card.Text>
          </Card.Body>
        </Card>
      </Row>

      {/* Card para acessar a criação de anúncios */}
      <Row>
        <Card className="dashboard-card" onClick={irParaCriarAnuncios}>
          <Card.Body>
            <Card.Title>Criação de Anúncios</Card.Title>
            <Card.Text>Crie anúncios para troca, venda ou doação.</Card.Text>
          </Card.Body>
        </Card>
      </Row>

      {/* Card para acessar a busca de anúncios */}
      <Row>
        <Card
          className="dashboard-card"
          onClick={() => handleNavigation("/buscaanuncios")}  // Navega para a rota de busca de anúncios.
        >
          <Card.Body>
            <Card.Title>Buscar Anúncios</Card.Title>
            <Card.Text>Pesquise anúncios disponíveis na plataforma.</Card.Text>
          </Card.Body>
        </Card>
      </Row>

      {/* Card para acessar a página de gerenciamento de anúncios do usuário */}
      <Row>
        <Card
          className="dashboard-card"
          onClick={() => handleNavigation("/meusanuncios")} // Navega para a rota de "Meus Anúncios".
        >
          <Card.Body>
            <Card.Title>Meus Anúncios</Card.Title>
            <Card.Text>Gerencie e acompanhe seus anúncios.</Card.Text>
          </Card.Body>
        </Card>
      </Row>

      {/* Card para acessar a página de comunicação (chat) */}
      <Row>
        <Card
          className="dashboard-card"
          onClick={() => handleNavigation("/chat")} // Navega para a rota de chat.
        >
          <Card.Body>
            <Card.Title>Comunicação</Card.Title>
            <Card.Text>Ver todas as conversas.</Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Dashboard;
