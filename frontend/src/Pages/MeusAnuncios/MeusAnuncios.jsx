import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

const MeusAnuncios = () => {
  const [ads, setAds] = useState([]);
  const [interestedAds, setInterestedAds] = useState([]);
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

        // Busca os anúncios de interesse
        const interestedAdsResponse = await axios.get(
          `http://localhost:5327/accounts/${accountId}/advertisements/interested`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInterestedAds(interestedAdsResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
        toast.error("Erro ao carregar os dados.");
      }
    };

    fetchAds();
  }, []);

  const handleDetails = (ad) => {
    setSelectedAd(ad); // Atualiza o anúncio selecionado
  };

  const handleFinishAd = async (adId) => {
    try {
      const token = localStorage.getItem("AccessToken");
      if (!token) {
        toast.error("Token não encontrado. Faça login novamente.");
        return;
      }

      // Faz a requisição DELETE para finalizar o anúncio
      await axios.delete(`http://localhost:5327/advertisements/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Impersonate": accountId,
        },
      });

      // Atualiza o status do anúncio localmente
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === adId ? { ...ad, status: "finished" } : ad
        )
      );
      toast.success("Anúncio finalizado com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar anúncio:", error);
      toast.error("Erro ao finalizar o anúncio.");
    }
  };

  const handleCloseModal = () => {
    setSelectedAd(null);
  };

  const handleRateAdOwner = async (adId, rating) => {
    try {
      const token = localStorage.getItem("AccessToken");
      if (typeof adId !== "string" || !adId) {
        toast.error("ID do anúncio inválido.");
        return;
      }

      if (rating < 0 || rating > 5) {
        toast.error("Avaliação deve ser entre 0 e 5.");
        return;
      }

      await axios.patch(
        `http://localhost:5327/advertisements/${adId}/rating`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Impersonate": accountId,
          },
        }
      );

      toast.success("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error);
      toast.error("Erro ao enviar a avaliação.");
    }
  };

  const handleUploadImages = async (files) => {
    if (files.length === 0 || !selectedAd) {
      console.error("Selecione um anúncio e tente novamente.");
      return;
    }

    const adId = selectedAd?.id;
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
      const response = await axios.patch(
        `http://localhost:5327/advertisements/${adId}/presign-url/${files[0].name}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Impersonate": accountId,
          },
        }
      );

      const presignedUrl = response.data.signed_url;
      await axios.put(presignedUrl, files[0], {
        headers: {
          "Content-Type": files[0].type,
        },
      });

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
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleDetails(ad)}
                >
                  Detalhes
                </button>
                {ad.status !== "finished" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleFinishAd(ad.id)}
                  >
                    Finalizar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Anúncios de Interesse</h2>
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
          {interestedAds
            .filter((ad) => ad.status === "finished") // Filtra os anúncios com status "finished"
            .map((ad) => (
              <tr key={ad.id}>
                <td>{ad.id}</td>
                <td>{ad.type}</td>
                <td>{ad.category}</td>
                <td>{ad.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleDetails(ad)}
                  >
                    Detalhes
                  </button>
                  {ad.status === "finished" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        const rating = parseFloat(
                          prompt("Informe uma avaliação (0 a 5):")
                        );
                        handleRateAdOwner(ad.id, rating);
                      }}
                    >
                      Avaliar
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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

                {/* Exibe o campo de upload apenas para Meus Anúncios */}
                {ads.some((ad) => ad.id === selectedAd.id) && (
                  <div
                    {...getRootProps()}
                    className="border-dashed border-2 p-4 rounded mt-3"
                  >
                    <input {...getInputProps()} />
                    <p>Arraste e solte a imagem ou clique para selecionar</p>
                  </div>
                )}
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
