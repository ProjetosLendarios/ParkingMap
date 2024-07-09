function initMap() {
    const center = { lat: -23.5505, lng: -46.6333 }; // Coordenadas de São Paulo, Brasil

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center
    });

    const service = new google.maps.places.PlacesService(map);
    
    const request = {
        location: center,
        radius: '5000',
        type: ['parking']
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(place => {
                const marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<div>
                                <h2>${place.name}</h2>
                                <p>Endereço: ${place.vicinity}</p>
                              </div>`
                });

                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            });
        } else {
            console.error('Erro ao buscar lugares: ' + status);
        }
    });
}
