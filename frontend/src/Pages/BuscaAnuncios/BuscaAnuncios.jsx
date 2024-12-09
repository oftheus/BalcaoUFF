import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// Declaração de estados do React para gerenciar valores dinâmicos
const BuscaAnuncios = () => {

  // Categoria selecionada pelo usuário
  const [category, setCategory] = useState("");

  // Subcategoria selecionada pelo usuário
  const [subCategory, setSubCategory] = useState("");

  // Lista de anúncios carregados
  const [advertisements, setAdvertisements] = useState([]);

  // Número da página atual
  const [page, setPage] = useState(1);

  // Quantidade de anúncios exibidos por página
  const [pageSize] = useState(6);

  // Total de anúncios disponíveis
  const [total, setTotal] = useState(0);

  // Indicador de carregamento
  const [loading, setLoading] = useState(false);

  // Mensagem de erro, caso ocorra
  const [error, setError] = useState(null);

  // Função para buscar anúncios da API
  const fetchAdvertisements = async () => {
    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Reseta possíveis erros anteriores

    // Criação do objeto de parâmetros para a API
    try {
      const params = {
        Page: page, // Define a página atual
        PageSize: pageSize, // Define o tamanho da página
      };

      // Lógica para decidir qual parâmetro enviar
      // Verifica se uma subcategoria foi selecionada
      if (subCategory) {
        params.CategoryName = subCategory;
      } else if (category) { // Mapeia a categoria selecionada para o tipo esperado pela API
        if (category === "Beleza") {
          params.Type = "beauty";
        } else if (category === "Eletrônicos") {
          params.Type = "electronics";
        } else if (category === "Moda") {
          params.Type = "fashion";
        } else if (category === "Eventos") {
          params.Type = "events";
        } else if (category == "Vagas de Emprego") {
          params.Type = "job_opportunities";
        } else if (category == "Animais") {
          params.Type = "pets";
        }
      }

      // Chamada à API para obter os anúncios
      const response = await axios.get("http://localhost:5327/advertisements", {
        params, // Envia os parâmetros configurados
      });

      // Atualiza os estados com os dados retornados
      
      // Define os anúncios carregados
      setAdvertisements(response.data.data);
      
      // Define o total de anúncios disponíveis
      setTotal(response.data.total);

    } catch (err) { 
      setError("Erro ao buscar anúncios.");
      console.error("Erro na busca:", err);
    }

    setLoading(false); // Desativa o estado de carregamento
  };

  // useEffect para buscar anúncios automaticamente sempre que `category`, `subCategory` ou `page` mudar
  useEffect(() => {
    fetchAdvertisements(); // Chama a função para buscar anúncios
  }, [category, subCategory, page]); // Dependências que disparam o useEffect

  
  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (e) => {

    // Atualiza a categoria selecionada
    setCategory(e.target.value);

    // Atualiza a categoria selecionada
    setSubCategory("");

    // Reseta a página para o início
    setPage(1);
  };

  
  // Função para lidar com a mudança de subcategoria
  const handleSubCategoryChange = (e) => {

    // Atualiza a subcategoria selecionada
    setSubCategory(e.target.value);

    // Reseta a página para o início
    setPage(1);
  };

  // Estados para gerenciar o anunciante selecionado e a exibição do modal
  const [selectedOwner, setSelectedOwner] = useState(null); // Detalhes do anunciante selecionado
  const [showModal, setShowModal] = useState(false); // Controle de exibição do modal

  // Função para tratar o clique em um anúncio
  const handleAdClick = async (ownerId) => {
    try {
      // Busca os detalhes do anunciante pelo ID
      const ownerDetails = await fetchOwnerDetails(ownerId);
      setSelectedOwner(ownerDetails); // Salva os detalhes no estado
      setShowModal(true); // Exibe o modal com os detalhes
    } catch (error) {
      alert("Não foi possível carregar as informações do anunciante.");
    }
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedOwner(null);
  };

  // Função para buscar os detalhes do anunciante via API
  const fetchOwnerDetails = async (ownerId) => {
    try {
      const response = await axios.get(
        `http://localhost:5327/accounts/${ownerId}`
      );
      return response.data;
    } catch (err) {
      console.error("Erro ao buscar detalhes do anunciante:", err);
      throw new Error("Erro ao buscar os detalhes do anunciante.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Buscar Anúncios</h1>

      {/* Select para escolha de categoria */}
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">
          Categoria
        </label>
        <select
          className="form-select"
          id="categorySelect"
          value={category} //Valor atual da categoria
          onChange={handleCategoryChange} //Atualiza o estado da categoria
        >
          <option value="">Todas as Categorias</option>
          <option value="Beleza">Beleza</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Moda">Moda</option>
          <option value="Eventos">Eventos</option>
          <option value="Vagas de Emprego">Vagas de Emprego</option>
          <option value="Animais">Animais</option>
        </select>
      </div>

      {/* Select para escolha de subcategoria */}
      {category && (
        <div className="mb-3">
          <label htmlFor="subCategorySelect" className="form-label">
            Subcategoria
          </label>
          <select
            className="form-select"
            id="subCategorySelect"
            value={subCategory} //Valor atual da subcategoria
            onChange={handleSubCategoryChange} // Atualiza o estado da subcategoria
          >
            <option value="">Todas as Subcategorias</option>
            {/* Subcategorias específicas de acordo com a categoria selecionada */}
            {category === "Beleza" && (
              <>
                <option value="makeup">Maquiagem</option>
                <option value="fragrances">Perfume</option>
                <option value="haircare">Cabelo</option>
                <option value="skincare">Pele</option>
              </>
            )}
            {category === "Eletrônicos" && (
              <>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="pcs">PCs</option>
                <option value="videogames">Videogames</option>
              </>
            )}
            {category === "Moda" && (
              <>
                <option value="mens_clothing">Roupas Masculinas</option>
                <option value="womens_clothing">Roupas Femininas</option>
                <option value="kids_clothing">Roupas Infantil</option>
                <option value="unisex">Roupas Unisex</option>
              </>
            )}
            {category === "Eventos" && (
              <>
                <option value="concerts">Concertos</option>
                <option value="workshops">Workshops</option>
                <option value="conferences">Conferências</option>
                <option value="parties_nighlife">Festas</option>
              </>
            )}
            {category === "Vagas de Emprego" && (
              <>
                <option value="it_software">Tecnologia</option>
                <option value="healthcare">Saúde</option>
                <option value="education">Educação</option>
                <option value="freelance">Freelance</option>
              </>
            )}
            {category === "Animais" && (
              <>
                <option value="accessories">Acessórios</option>
              </>
            )}
          </select>
        </div>
      )}

      {loading && <p>Carregando...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Lista de anúncios exibidos em cards */}
      <div className="row">
        {advertisements.map((ad) => (
          <div className="col-md-4 mb-4" key={ad.id}>
            <div
              className="card h-100 shadow-sm"
              onClick={() => handleAdClick(ad.owner.id)} // Ao clicar, carrega detalhes do anunciante
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                {/* Renderizar detalhes dos anúncios de acordo com a subcategoria */}
                {ad.type === "beauty" && ad.beauty_details && (
                  <div>
                    <h5 className="card-title">{ad.beauty_details.title}</h5>
                    <h6 className="text-muted">{ad.beauty_details.brand}</h6>
                    <p className="card-text">
                      <strong>Descrição:</strong>{" "}
                      {ad.beauty_details.description} <br />
                      <strong>Preço:</strong> R$
                      {ad.beauty_details.price.toFixed(2)} <br />
                      {ad.beauty_details.skin_type && (
                        <>
                          <strong>Tipo de pele:</strong>{" "}
                          {ad.beauty_details.skin_type} <br />
                        </>
                      )}
                      {ad.beauty_details.is_organic !== undefined && (
                        <>
                          <strong>Orgânico:</strong>{" "}
                          {ad.beauty_details.is_organic ? "Sim" : "Não"} <br />
                        </>
                      )}
                      {ad.beauty_details.product_type && (
                        <>
                          <strong>Tipo de produto:</strong>{" "}
                          {ad.beauty_details.product_type} <br />
                        </>
                      )}
                      {ad.beauty_details.ingredients?.length > 0 && (
                        <>
                          <strong>Ingredientes:</strong>{" "}
                          {ad.beauty_details.ingredients.join(", ")} <br />
                        </>
                      )}
                      {ad.beauty_details.expiration_date && (
                        <>
                          <strong>Data de validade:</strong>{" "}
                          {new Date(
                            ad.beauty_details.expiration_date
                          ).toLocaleDateString()}{" "}
                          <br />
                        </>
                      )}
                    </p>
                  </div>
                )}
                {ad.type === "fashion" && ad.fashion_details && (
                  <div>
                    <h5 className="card-title">{ad.fashion_details.title}</h5>
                    <h6 className="text-muted">{ad.fashion_details.brand}</h6>
                    <p className="card-text">
                      <strong>Descrição:</strong>{" "}
                      {ad.fashion_details.description} <br />
                      <strong>Preço:</strong> R${" "}
                      {ad.fashion_details.price.toFixed(2)} <br />
                      <strong>Gênero:</strong> {ad.fashion_details.gender}{" "}
                      <br />
                      <strong>Tamanhos:</strong>{" "}
                      {ad.fashion_details.sizes.join(", ")} <br />
                      <strong>Cores:</strong>{" "}
                      {ad.fashion_details.colors.join(", ")} <br />
                      <strong>Materiais:</strong>{" "}
                      {ad.fashion_details.materials.join(", ")} <br />
                      <strong>Características:</strong>{" "}
                      {ad.fashion_details.features.join(", ")} <br />
                      {ad.fashion_details.is_handmade !== undefined && (
                        <>
                          <strong>Feito a mão?:</strong>{" "}
                          {ad.fashion_details.is_handmade ? "Sim" : "Não"}{" "}
                          <br />
                        </>
                      )}
                      {ad.fashion_details.is_sustainable !== undefined && (
                        <>
                          <strong>É sustentável?:</strong>{" "}
                          {ad.fashion_details.is_sustainable ? "Sim" : "Não"}{" "}
                          <br />
                        </>
                      )}
                    </p>
                  </div>
                )}
                {ad.type === "electronics" && ad.electronics_details && (
                  <div>
                    <h5 className="card-title">
                      {ad.electronics_details.title}
                    </h5>
                    <h6 className="text-muted">
                      {ad.electronics_details.brand}
                    </h6>
                    <p className="card-text">
                      <strong>Descrição:</strong>{" "}
                      {ad.electronics_details.description} <br />
                      <strong>Preço:</strong> R$
                      {ad.electronics_details.price.toFixed(2)} <br />
                      {ad.electronics_details.model && (
                        <>
                          <strong>Modelo:</strong>{" "}
                          {ad.electronics_details.model} <br />
                        </>
                      )}
                      {ad.electronics_details.storage_capacity && (
                        <>
                          <strong>Capacidade:</strong>{" "}
                          {ad.electronics_details.storage_capacity} <br />
                        </>
                      )}
                      {ad.electronics_details.memory && (
                        <>
                          <strong>Memória:</strong>{" "}
                          {ad.electronics_details.memory} <br />
                        </>
                      )}
                      {ad.electronics_details.processor && (
                        <>
                          <strong>Processador:</strong>{" "}
                          {ad.electronics_details.processor} <br />
                        </>
                      )}
                      <strong>Saúde da Bateria:</strong>
                      {ad.electronics_details.battery_life * 100}% <br />
                      {ad.electronics_details.condition && (
                        <>
                          <strong>Condição:</strong>{" "}
                          {ad.electronics_details.condition} <br />
                        </>
                      )}
                      {ad.electronics_details.warranty_until && (
                        <>
                          <strong>Garantia até:</strong>{" "}
                          {new Date(
                            ad.electronics_details.warranty_until
                          ).toLocaleDateString()}{" "}
                          <br />
                        </>
                      )}
                      {ad.electronics_details.accessories?.length > 0 && (
                        <>
                          <strong>Acessórios:</strong>{" "}
                          {ad.electronics_details.accessories.join(", ")} <br />
                        </>
                      )}
                      {ad.electronics_details.features?.length > 0 && (
                        <>
                          <strong>Outras Características:</strong>{" "}
                          {ad.electronics_details.features.join(", ")} <br />
                        </>
                      )}
                      {ad.electronics_details.includes_original_box !==
                        undefined && (
                        <>
                          <strong>Inclui a Caixa Original? :</strong>{" "}
                          {ad.electronics_details.includes_original_box
                            ? "Sim"
                            : "Não"}{" "}
                          <br />
                        </>
                      )}
                    </p>
                  </div>
                )}
                {ad.type === "events" && ad.events_details && (
                  <div>
                    <h5 className="card-title">{ad.events_details.title}</h5>
                    <h6 className="text-muted">
                      {ad.events_details.organizer}
                    </h6>
                    <p className="card-text">
                      <strong>Descrição:</strong>{" "}
                      {ad.events_details.description} <br />
                      <strong>Preço:</strong> R$
                      {ad.events_details.price.toFixed(2)} <br />
                      {ad.events_details.event_type && (
                        <>
                          <strong>Tipo de Evento:</strong>{" "}
                          {ad.events_details.event_type} <br />
                        </>
                      )}
                      {ad.events_details.event_date && (
                        <>
                          <strong>Data do Evento:</strong>{" "}
                          {new Date(
                            ad.events_details.event_date
                          ).toLocaleDateString()}{" "}
                          <br />
                        </>
                      )}
                      {ad.events_details.age_restriction && (
                        <>
                          <strong>Restrição de Idade:</strong>{" "}
                          {ad.events_details.age_restriction} <br />
                        </>
                      )}
                      {ad.events_details.dress_code && (
                        <>
                          <strong>Traje:</strong> {ad.events_details.dress_code}{" "}
                          <br />
                        </>
                      )}
                      {ad.events_details.highlights?.length > 0 && (
                        <>
                          <strong>Destaques:</strong>{" "}
                          {ad.events_details.highlights.join(", ")} <br />
                        </>
                      )}
                      <strong>Evento Online:</strong>{" "}
                      {ad.events_details.is_online ? "Sim" : "Não"} <br />
                      {ad.events_details.contact_info && (
                        <>
                          <strong>Contato:</strong> <br />
                          {ad.events_details.contact_info.phone && (
                            <>
                              Telefone:
                              {
                                ad.events_details.contact_info.phone
                              }
                              <br />
                            </>
                          )}
                          {ad.events_details.contact_info.email && (
                            <>
                              Email:{" "}
                              {ad.events_details.contact_info.email}{" "}
                              <br />
                            </>
                          )}
                          {ad.events_details.contact_info.website && (
                            <>
                              Website:{" "}
                              <a
                                href={
                                  ad.events_details.contact_info.website
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {ad.events_details.contact_info.website}
                              </a>{" "}
                              <br />
                            </>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                )}
                {ad.type === "job_opportunities" &&
                  ad.job_opportunities_details && (
                    <div>
                      <h5 className="card-title">
                        {ad.job_opportunities_details.title}
                      </h5>
                      <h6 className="text-muted">
                        {ad.job_opportunities_details.company}
                      </h6>
                      <p className="card-text">
                        <strong>Descrição:</strong>{" "}
                        {ad.job_opportunities_details.description} <br />
                        <strong>Posição:</strong>{" "}
                        {ad.job_opportunities_details.position} <br />
                        {ad.job_opportunities_details.salary &&
                          ad.job_opportunities_details.is_salary_disclosed && (
                            <>
                              <strong>Salário:</strong> R$
                              {ad.job_opportunities_details.salary.toFixed(
                                2
                              )}{" "}
                              <br />
                            </>
                          )}
                        {!ad.job_opportunities_details.is_salary_disclosed && (
                          <>
                            <strong>Salário:</strong> Não divulgado <br />
                          </>
                        )}
                        <strong>Tipo de Trabalho:</strong>{" "}
                        {ad.job_opportunities_details.work_location ===
                          "hybrid" && "Híbrido"}
                        {ad.job_opportunities_details.work_location ===
                          "remote" && "Remoto"}
                        {ad.job_opportunities_details.work_location ===
                          "on_site" && "Presencial"}{" "}
                        <br />
                        <strong>Tipo de Contrato:</strong>{" "}
                        {ad.job_opportunities_details.employment_type} <br />
                        <strong>Nível de Experiência:</strong>{" "}
                        {ad.job_opportunities_details.experience_level} <br />
                        {ad.job_opportunities_details.skills?.length > 0 && (
                          <>
                            <strong>Habilidades:</strong>{" "}
                            {ad.job_opportunities_details.skills.join(", ")}{" "}
                            <br />
                          </>
                        )}
                        {ad.job_opportunities_details.benefits?.length > 0 && (
                          <>
                            <strong>Benefícios:</strong>{" "}
                            {ad.job_opportunities_details.benefits.join(", ")}{" "}
                            <br />
                          </>
                        )}
                        {ad.job_opportunities_details.realocation_help && (
                          <>
                            <strong>Ajuda com Relocação:</strong> Disponível{" "}
                            <br />
                          </>
                        )}
                        <strong>Data Limite para Aplicação:</strong>{" "}
                        {new Date(
                          ad.job_opportunities_details.application_deadline
                        ).toLocaleDateString()}{" "}
                        <br />
                        <strong>Informações de Contato:</strong> <br />
                        {ad.job_opportunities_details.contact_info
                          ?.phone && (
                          <>
                            <strong>Telefone:</strong> 
                            {
                              ad.job_opportunities_details.contact_info
                                .phone
                            }
                            <br />
                          </>
                        )}
                        {ad.job_opportunities_details.contact_info
                          ?.email && (
                          <>
                            <strong>Email:</strong>{" "}
                            {
                              ad.job_opportunities_details.contact_info
                                .email
                            }{" "}
                            <br />
                          </>
                        )}
                        {ad.job_opportunities_details.contact_info
                          ?.website && (
                          <>
                            <strong>Website:</strong>{" "}
                            <a
                              href={
                                ad.job_opportunities_details.contact_info
                                  .website
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {
                                ad.job_opportunities_details.contact_info
                                  .website
                              }
                            </a>{" "}
                            <br />
                          </>
                        )}
                      </p>
                    </div>
                  )}
                {ad.type === "pets" && ad.pet_details && (
                  <div>
                    <h5 className="card-title">{ad.pet_details.title}</h5>
                    <h6 className="text-muted">{ad.pet_details.brand}</h6>
                    <p className="card-text">
                      <strong>Descrição:</strong> {ad.pet_details.description}{" "}
                      <br />
                      <strong>Preço:</strong> R${" "}
                      {ad.pet_details.price.toFixed(2)} <br />
                      <strong>Animal:</strong>{" "}
                      {Array.isArray(ad.pet_details.animal_type)
                        ? ad.pet_details.animal_type.join(", ")
                        : ad.pet_details.animal_type || "N/A"}{" "}
                      <br />
                      <strong>Tipo do Acessório:</strong>{" "}
                      {Array.isArray(ad.pet_details.accessory_type)
                        ? ad.pet_details.accessory_type.join(", ")
                        : ad.pet_details.accessory_type || "N/A"}{" "}
                      <br />
                      <strong>Materiais:</strong>{" "}
                      {Array.isArray(ad.pet_details.materials)
                        ? ad.pet_details.materials.join(", ")
                        : ad.pet_details.materials || "N/A"}{" "}
                      <br />
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer text-muted">
                Publicado em: {new Date(ad.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedOwner && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Informações do Anunciante</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Nome:</strong> {selectedOwner.name}
                </p>
                <p>
                  <strong>Descrição:</strong> {selectedOwner.description}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOwner.email}
                </p>
                <p>
                  <strong>Reputação:</strong> {selectedOwner.rating}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controles de Paginação */}
      <div className="d-flex justify-content-between align-items-center my-4">
        
        {/* Botão para voltar à página anterior */}
        <button
          className="btn btn-secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} // Diminui o número da página, mas não permite valores menores que 1
          disabled={page === 1} // Desativa o botão quando já está na primeira página
        >
          Anterior
        </button>

        {/* Indicação da página atual */}
        <span>Página {page}</span>

        {/* Botão para avançar para a próxima página */}
        <button
          className="btn btn-secondary"
          onClick={() =>
            // Aumenta o número da página se ainda houver itens restantes
            setPage((prev) => (page * pageSize < total ? prev + 1 : prev)) 
          }
          disabled={page * pageSize >= total} // Desativa o botão quando não há mais itens para exibir
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default BuscaAnuncios;
