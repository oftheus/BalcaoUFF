import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const Criacao = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    contactInfo: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de submissão do formulário
    console.log(formData);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Criar Novo Anúncio</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Livro de Cálculo"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Descreva seu anúncio..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Form.Select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Selecione uma categoria</option>
            <option value="livros">Livros</option>
            <option value="roupas">Roupas</option>
            <option value="moveis">Móveis</option>
            <option value="aulas">Aulas Particulares</option>
            <option value="eletronicos">Eletrônicos</option>
            <option value="servicos">Serviços</option>
            <option value="decoracao">Decoração</option>
            <option value="outros">Outros</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Deixe em branco se for uma doação"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="contactInfo">
          <Form.Label>Informações de Contato</Form.Label>
          <Form.Control
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Ex: seuemail@id.uff.br"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Localização</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Campus Niterói"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="photos">
          <Form.Label>Fotos</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Anúncio
        </Button>
      </Form>
    </Container>
  );
};

export default Criacao;
