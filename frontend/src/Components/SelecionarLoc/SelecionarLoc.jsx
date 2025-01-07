import React, { useEffect, useRef, useState } from "react";

function SelecionarLoc({ onLocationSelect }) {
  const mapRef = useRef(null); //// Referência ao elemento DOM onde o mapa será renderizado
  const [map, setMap] = useState(null); // Estado para armazenar a instância do mapa do Google Maps
  const [marker, setMarker] = useState(null); // Estado para armazenar a instância do marcador no mapa

  useEffect(() => {
    const google = window.google; // Obtém o objeto global do Google Maps disponível na janela

    // Inicializa o mapa e define as configurações iniciais
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: -22.90278, lng: -43.2075 }, // Coordenadas iniciais (exemplo: Rio de Janeiro)
      zoom: 10, // Nível de zoom inicial
    });

    // Adiciona um listener para capturar cliques no mapa
    mapInstance.addListener("click", (event) => {
      // Extrai as coordenadas latitude e longitude do local clicado
      const { lat, lng } = event.latLng.toJSON();

      // Se já houver um marcador, atualiza sua posição
      if (marker) {
        marker.setPosition(event.latLng);
      } else {
        // Caso contrário, cria um novo marcador no local clicado
        const newMarker = new google.maps.Marker({
          position: event.latLng, // Define a posição inicial do marcador
          map: mapInstance, // Adiciona o marcador ao mapa atual
        });
        setMarker(newMarker); // Salva a referência ao marcador no estado
      }

      // Chama a função passada pelo componente pai para enviar as coordenadas
      onLocationSelect({ latitude: lat, longitude: lng });
    });

    // Salva a instância do mapa no estado
    setMap(mapInstance);
  }, [marker, onLocationSelect]); // Dependências: atualiza o efeito se "marker" ou "onLocationSelect" mudarem

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>; // Div que será usada como contêiner para renderizar o mapa
}

export default SelecionarLoc;
