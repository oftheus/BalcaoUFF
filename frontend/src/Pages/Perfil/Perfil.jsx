import "./Perfil.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Perfil = () => {
  // Estado para armazenar os dados do perfil retornados pela API.
  const [profile, setProfile] = useState(null);

  // Estado para indicar se os dados estão sendo carregados.
  const [loading, setLoading] = useState(true);

  // Estado para armazenar mensagens de erro, caso ocorram.
  const [error, setError] = useState(null);

  // ID do usuário usado para buscar os dados do perfil.
  const hardcodedId = "account_01JE9FY9Q1XXSETES05957AEZQ";

  // URL da API para buscar os dados do perfil do usuário.
  const API_URL = `http://localhost:5327/accounts/${hardcodedId}`;

  // useEffect é utilizado para buscar os dados do perfil assim que o componente é montado.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Faz uma requisição GET à API para buscar os dados do perfil.
        const response = await axios.get(API_URL);
        // Atualiza o estado do perfil com os dados recebidos.
        setProfile(response.data);
      } catch (err) {
        // Atualiza o estado de erro caso a requisição falhe.
        setError("Erro ao carregar os dados do perfil.");
      } finally {
        // Define que o carregamento terminou, independente de sucesso ou erro.
        setLoading(false);
      }
    };

    fetchProfile(); // Chama a função para buscar os dados.
  }, [API_URL]); // Dependência para evitar que a URL seja recalculada.

  if (loading) { // Exibe um spinner de carregamento enquanto os dados ainda estão sendo buscados.
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando...</p>
      </Container>
    );
  }

  // Exibe uma mensagem de erro caso a busca dos dados falhe.
  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  // Retorna o conteúdo do perfil quando os dados foram carregados com sucesso.
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {/* Componente do Bootstrap para exibir os dados em um cartão */}
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
                <strong>Reputação:</strong> {profile.rating}
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
