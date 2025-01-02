import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";

const MeusAnuncios = () => {
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [accountId, setAccountId] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleUploadImages(acceptedFiles),
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("AccessToken");
        if (!token) {
          console.error("Token não encontrado. Faça login novamente.");
          return;
        }

        const accountResponse = await fetch("http://localhost:5327/accounts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!accountResponse.ok) {
          console.error("Erro ao buscar conta:", accountResponse.status);
          return;
        }

        const accountData = await accountResponse.json();
        const accountId = accountData?.id;
        if (!accountId) {
          console.error("ID da conta não encontrado.");
          return;
        }

        setAccountId(accountId);

        // Busca os anúncios
        const adsResponse = await axios.get(
          `http://localhost:5327/accounts/${accountId}/advertisements`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAds(adsResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
      }
    };

    fetchAds();
  }, []);

  const handleDetails = (ad) => {
    setSelectedAd(ad); // Atualiza o anúncio selecionado
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
  };

  // Função para fazer o upload das imagens
  const handleUploadImages = async (files) => {
    if (files.length === 0 || !selectedAd) {
      console.error("Selecione um anúncio e tente novamente.");
      return;
    }

    const adId = selectedAd?.id; // Usa o ID do anúncio selecionado
    if (!adId) {
      console.error("Anúncio não encontrado.");
      return;
    }

    const token = localStorage.getItem("AccessToken");
    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    try {
      // Requisição para obter a URL pré-assinada
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:5327/advertisements/${adId}/presign-url/${files[0].name}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Impersonate": accountId,
        },
      });

      const presignedUrl = response.data.signed_url;

      // Realiza o upload do arquivo usando a URL pré-assinada
      await axios.put(presignedUrl, files[0], {
        headers: {
          "Content-Type": files[0].type,
        },
      });

      console.log("Imagem carregada com sucesso!");
      toast.success("Imagem carregada com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer o upload da imagem:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Meus Anúncios</h2>
      <ToastContainer />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad.id}>
              <td>{ad.id}</td>
              <td>{ad.type}</td>
              <td>{ad.category}</td>
              <td>{ad.status}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDetails(ad)} // Atualiza o anúncio selecionado
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para exibir os detalhes do anúncio selecionado */}
      {selectedAd && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="adDetailsModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="adDetailsModal">
                  Detalhes do Anúncio
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {selectedAd.id}
                </p>
                <p>
                  <strong>Status:</strong> {selectedAd.status}
                </p>
                <p>
                  <strong>Tipo:</strong> {selectedAd.type}
                </p>
                <p>
                  <strong>Categoria:</strong> {selectedAd.category}
                </p>
                <p>
                  <strong>Expira em:</strong>{" "}
                  {new Date(selectedAd.expires_at).toLocaleString()}
                </p>

                {/* Campo de upload dentro da modal */}
                <div
                  {...getRootProps()}
                  className="border-dashed border-2 p-4 rounded mt-3"
                >
                  <input {...getInputProps()} />
                  <p>Arraste e solte a imagem ou clique para selecionar</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusAnuncios;
