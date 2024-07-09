document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([-23.5505, -46.6333], 14); // Coordenadas de São Paulo, Brasil

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Função para buscar dados dos parques de estacionamento
    function fetchParkingLots() {
        const bounds = map.getBounds();
        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        const overpassQuery = `
            [out:json];
            (
                node["amenity"="parking"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
                way["amenity"="parking"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
                relation["amenity"="parking"](${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()});
            );
            out center;
        `;

        fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQuery)}`)
            .then(response => response.json())
            .then(data => {
                data.elements.forEach(element => {
                    const lat = element.lat || element.center.lat;
                    const lon = element.lon || element.center.lon;
                    const name = element.tags.name || 'Estacionamento';
                    const address = element.tags['addr:street'] || 'Endereço não disponível';

                    const marker = L.marker([lat, lon]).addTo(map);
                    const popupContent = `<div>
                                            <h5>${name}</h5>
                                            <p><strong>Endereço:</strong> ${address}</p>
                                          </div>`;
                    marker.bindPopup(popupContent);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar dados dos estacionamentos:', error);
            });
    }

    // Buscar dados dos estacionamentos quando o mapa é carregado
    map.on('load', fetchParkingLots);

    // Buscar dados dos estacionamentos quando o mapa é movido
    map.on('moveend', fetchParkingLots);

    // Carregar dados iniciais
    fetchParkingLots();
});
