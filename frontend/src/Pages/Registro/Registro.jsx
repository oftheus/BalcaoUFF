import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("AccessToken");
    console.log("(Registro.jsx) Token recuperado:", token);
    if (!token) {
      console.error("Token não encontrado (Registro.jsx)");
    }

    try {
      const response = await fetch("http://localhost:5327/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Conta cadastrada com sucesso.");
        navigate("/dashboard");
      } else {
        console.error("Erro ao cadastrar conta:", response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error.message);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Digite seu nome"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpf" className="form-label">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          className="form-control"
          placeholder="Digite seu CPF"
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          placeholder="Digite uma descrição"
          rows="3"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Cadastrar
      </button>
    </form>
  );
  

};

export default Registration;
