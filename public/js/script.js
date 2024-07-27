console.log("Hi from Frontend");
const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("user_location", { latitude, longitude });
    },
    (error) => {
      console.error("Error in client script: ", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

// L is provided to u by Leaflet and in the setview method [latitude, longitude] -> Global Cooordinates , 10 -> Degree of Zooming
const map = L.map("map").setView([0, 0], 17);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Cab-Service",
}).addTo(map);

const markers = {};

socket.on("current_location", (data => {
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude]);

    if(markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
}));

socket.on("user_disconnected", (id) => {
    if(markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    };
});