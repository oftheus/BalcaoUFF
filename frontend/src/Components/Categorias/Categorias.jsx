import React from "react";
import "./Categorias.css";
import "bootstrap/dist/css/bootstrap.min.css";
import roupas from "../../assets/roupas.png";
import aulas from "../../assets/aulas.png";
import eletro from "../../assets/eletro.png";
import servicos from "../../assets/servicos.png";
import animais from "../../assets/animal.png";
import outros from "../../assets/outros.png";
import beauty from "../../assets/beauty.png";

const Categorias = () => {
  // Definição de um array de categorias, cada uma contendo um nome e a URL da imagem associada
  const categories = [
    { name: "Beleza", imageUrl: beauty },
    { name: "Eletrônicos", imageUrl: eletro },
    { name: "Moda", imageUrl: roupas },
    { name: "Eventos", imageUrl: aulas },
    { name: "Empregos", imageUrl: servicos },
    { name: "Animais", imageUrl: animais },
    { name: "Outros", imageUrl: outros },
  ];

  return (
    <div className="categorias-container container">
      <h2>Categorias</h2>

      {/* Container flexível para organizar as categorias */}
      <div className="d-flex flex-row flex-wrap justify-content-start">
        {/* Renderiza cada categoria como um card */}
        {categories.map((category, index) => (
          <div className="card m-1" key={index}>
            {/* Exibe a imagem da categoria */}
            <img
              src={category.imageUrl}
              className="card-img-top mx-auto" // Centraliza a imagem
              alt={category.name} //Texto alternativo com o nome da categoria, para acessibilidade
              style={{ height: "100px", objectFit: "contain" }} // Ajusta a altura da imagem
            />
            <div className="card-body text-center">
              {/* Nome da categoria exibido no corpo do card */}
              <h5 className="card-title">{category.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
