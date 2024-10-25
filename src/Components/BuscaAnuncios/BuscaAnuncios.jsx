import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import livro from '../../assets/livro_useacabeca.png';
import mesa from '../../assets/mesa.jpg';
import './BuscaAnuncios.css';

const AnuncioCard = ({ anuncio }) => {
  return (
    <Card className="card-anuncio">
      <Card.Img variant="top" src={anuncio.imagem} alt="Imagem do Anúncio" />
      <Card.Body className="card-body">
        <Card.Title>{anuncio.titulo}</Card.Title>
        <Card.Text>
          {anuncio.descricao}
          <br />
          <strong>Categoria:</strong> {anuncio.categoria}
          <br />
          <strong>Localização:</strong> {anuncio.localizacao}
          <br />
          <strong>Preço:</strong> {anuncio.preco ? `R$ ${anuncio.preco}` : 'Grátis'}
        </Card.Text>
        <Button variant="primary" className="btn-vermais">Ver mais</Button>
      </Card.Body>
    </Card>
  );
};

const BuscaAnuncios = () => {
  const [anuncios, setAnuncios] = useState([
    {
      id: 1,
      titulo: 'Livro Use a Cabeça! PMP',
      descricao: 'Livro em bom estado.',
      categoria: 'Livros',
      localizacao: 'Campus Niterói',
      preco: 50,
      imagem: livro
    },
    {
      id: 2,
      titulo: 'Mesa',
      descricao: 'Mesa de madeira num estado ótimo',
      categoria: 'Decoração',
      localizacao: 'Campus UFF Gragoatá',
      preco: 150,
      imagem: mesa
    },
  ]);

  return (
    <Container className="container-busca-anuncios">
      <h2 className="titulo-busca">Busca de Anúncios</h2>
      
      <Form className="form-busca">
        <Form.Control type="text" placeholder="Buscar anúncios..." className="form-control" />
        <div className="form-filtro">
          <Form.Select className="form-control">
            <option value="">Categoria</option>
            <option value="livros">Livros</option>
            <option value="Roupas">Roupas</option>
            <option value="Móveis">Móveis</option>
            <option value="Aulas">Aulas</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Serviços">Serviços</option>
            <option value="Decoração">Decoração</option>
            <option value="Outros">Outros</option>

          </Form.Select>
          <Form.Select className="form-control">
            <option value="">Localização</option>
            <option value="Campus Niterói">Campus Niterói</option>
            <option value="Campus UFF Gragoatá">Campus UFF Gragoatá</option>
          </Form.Select>
          <Form.Control type="number" placeholder="Preço Máx." className="form-control" />
        </div>
      </Form>

      <Row>
        {anuncios.map((anuncio) => (
          <Col key={anuncio.id} md={4}>
            <AnuncioCard anuncio={anuncio} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuscaAnuncios;