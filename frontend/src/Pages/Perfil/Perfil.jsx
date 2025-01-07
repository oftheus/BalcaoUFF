import "./Perfil.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Perfil = () => {
  const [profile, setProfile] = useState(null); // Estado para armazenar o perfil
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para mensagens de erro

  // URL da API para buscar os dados do perfil
  const API_URL = "http://localhost:5327/accounts";

  // useEffect para buscar os dados do perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        console.log("Token no Perfil:", token);

        if (!token) {
          throw new Error("Token não encontrado. Faça login novamente.");
        }

        // Faz a requisição GET com o Bearer Token
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Atualiza o estado do perfil com os dados recebidos
        console.log("Resposta da API:", response.data);
        setProfile(response.data);
        
      } catch (err) {
        // Atualiza o estado de erro caso a requisição falhe
        console.error("Erro na requisição:", err);
        setError(
          err.response?.data?.message || "Erro ao carregar os dados do perfil."
        );
      } finally {
        // Define que o carregamento terminou
        setLoading(false);
      }
    };

    fetchProfile(); // Chama a função para buscar os dados
  }, [API_URL]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Perfil</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {profile.name}
              </Card.Text>
              <Card.Text>
                <strong>CPF:</strong> {profile.cpf}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {profile.email}
              </Card.Text>
              <Card.Text>
                <strong>Descrição:</strong> {profile.description}
              </Card.Text>
              <Card.Text>
                <strong>Reputação:</strong> {profile.rating.rating}
              </Card.Text>
              <Card.Text>
                <strong>Criado em:</strong>{" "}
                {new Date(profile.created_at).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
