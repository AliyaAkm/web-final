const map = L.map('map').setView([20.0, 0.0], 2); 

L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=rlaIeONoI97q7tDb8QJD', {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);


const movieLocations = [
    {
        title: "The Lord of the Rings",
        location: "Matamata, New Zealand",
        lat: -37.8667,
        lng: 175.6830,
        img: "img/lord.png",
        description: "Hobbiton village from this epic saga.",
        genre: "Fantasy",
    },
    {
        title: "Harry Potter",
        location: "Oxford, England",
        lat: 51.7520,
        lng: -1.2577,
        img: "img/harry.png",
        description: "Hogwarts Great Hall inspiration.",
        genre: "Fantasy",
    },
    {
        title: "Inception",
        location: "Paris, France",
        lat: 48.8566,
        lng: 2.3522,
        img: "img/increption.jpg",
        description: "Dreamscape bridge scenes.",
        genre: "Action",
    },
    {
        title: "Avengers: Endgame",
        location: "Atlanta, USA",
        lat: 33.7490,
        lng: -84.3880,
        img: "img/Avengers.png",
        description: "MCU iconic locations.",
        genre: "Action",
    },
    {
        title: "The Dark Knight",
        location: "Chicago, USA",
        lat: 41.8781,
        lng: -87.6298,
        img: "img/dark.png",
        description: "Gotham City in Chicago.",
        genre: "Drama",
    }
];


const customIcon = L.icon({
    iconUrl: 'img/Clapperboard-PNG-Picture.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});


const markers = L.markerClusterGroup();


function addMarkers(locations) {
    markers.clearLayers();
    locations.forEach(movie => {
        const marker = L.marker([movie.lat, movie.lng], { icon: customIcon });
        marker.bindPopup(`
            <div style="text-align: center; max-width: 300px;">
                <img src="${movie.img}" alt="${movie.title}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;">
                <h5>${movie.title}</h5>
                <p><em>${movie.location}</em></p>
                <p style="font-size: 0.9rem;">${movie.description}</p>
                <button onclick="addToFavorites('${movie.title}')">Add to Favorites</button>
            </div>
        `);
        markers.addLayer(marker);
    });
    map.addLayer(markers);
}


document.getElementById('genre-filter').addEventListener('change', (event) => {
    const selectedGenre = event.target.value;
    if (selectedGenre === "all") {
        addMarkers(movieLocations);
    } else {
        const filteredLocations = movieLocations.filter(movie => movie.genre === selectedGenre);
        addMarkers(filteredLocations);
    }
});

function addToFavorites(title) {
    const favoritesList = document.getElementById('favorites-list');
    const existingItem = Array.from(favoritesList.children).find(item => item.textContent === title);
    if (!existingItem) {
        const listItem = document.createElement('li');
        listItem.textContent = title;
        favoritesList.appendChild(listItem);
    } else {
        alert('This location is already in your favorites!');
    }
}


addMarkers(movieLocations);
