import React from 'react';
import './Categorias.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import livro from '../../assets/livros.png';
import roupas from '../../assets/roupas.png';
import moveis from '../../assets/moveis.png';
import aulas from '../../assets/aulas.png';
import eletro from '../../assets/eletro.png';
import servicos from '../../assets/servicos.png';
import decorativo from '../../assets/decorativo.png';
import outros from '../../assets/outros.png';

const Categorias = () => {
  const categories = [
    { name: 'Livros', imageUrl: livro },
    { name: 'Roupas', imageUrl: roupas },
    { name: 'Móveis', imageUrl: moveis },
    { name: 'Aulas', imageUrl: aulas },
    { name: 'Eletrônicos', imageUrl: eletro },
    { name: 'Serviços', imageUrl: servicos },
    { name: 'Decoração', imageUrl: decorativo },
    { name: 'Outros', imageUrl: outros },
  ];

  return (
    <div className="categorias-container container">
      <h2>Categorias</h2>
      <div className="d-flex flex-row flex-wrap justify-content-start">
        {categories.map((category, index) => (
          <div className="card m-1" key={index}>
            <img 
              src={category.imageUrl} 
              className="card-img-top mx-auto" // Centraliza a imagem
              alt={category.name} 
              style={{ height: '100px', objectFit: 'contain' }} // Ajusta a altura da imagem
            />
            <div className="card-body text-center">
              <h5 className="card-title">{category.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;