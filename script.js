function initMap() {
    const mapOptions = {
        zoom: 12,
        center: { lat: -23.5505, lng: -46.6333 } // Coordenadas de São Paulo, Brasil
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    const parkingLots = [
        {
            name: 'Estacionamento Central',
            location: { lat: -23.5505, lng: -46.6333 },
            address: 'Rua Principal, 123',
            spaces: 150
        },
        {
            name: 'Parque Norte',
            location: { lat: -23.5587, lng: -46.6253 },
            address: 'Avenida Norte, 456',
            spaces: 200
        },
        {
            name: 'Estacionamento Sul',
            location: { lat: -23.5647, lng: -46.6396 },
            address: 'Rua Sul, 789',
            spaces: 100
        }
    ];

    parkingLots.forEach(lot => {
        const marker = new google.maps.Marker({
            position: lot.location,
            map: map,
            title: lot.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<div>
                        <h2>${lot.name}</h2>
                        <p>Endereço: ${lot.address}</p>
                        <p>Vagas: ${lot.spaces}</p>
                      </div>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}
