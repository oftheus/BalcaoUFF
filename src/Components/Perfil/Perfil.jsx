import React from 'react';
import './Perfil.css';

const Perfil = () => {
  // Dados hard-coded para simulação
  const userData = {
    name: "Matheus Gonçalves",
    email: "goncalvesmatheus@id.uff.br",
    occupation: "Estudante de Ciência da Computação",
    rating: 4.5,
    transactions: [
      { id: 1, title: "Venda de Livro de Algoritmos" },
      { id: 2, title: "Troca de Cadeira de Escritório" },
      { id: 3, title: "Doação de Roupas" },
    ],
  };

  return (
    <div className="app-container">
      <div className="profile-container">
        <h2>Perfil de {userData.name}</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Ocupação:</strong> {userData.occupation}</p>
        <p><strong>Reputação:</strong> {userData.rating} estrelas</p>
        
        <h3>Histórico de Transações</h3>
        <ul>
          {userData.transactions.map((transaction) => (
            <li key={transaction.id}>{transaction.title}</li>
          ))}
        </ul>
        
        <h3>Configurações</h3>
        <button onClick={() => alert('Editar perfil')}>Editar Perfil</button>
      </div>
    </div>
  );
};

export default Perfil;