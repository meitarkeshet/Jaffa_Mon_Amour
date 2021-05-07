var mymap = L.map('mapid').setView([32.049357, 34.758355], 15); // change zoom and center

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamFmZmFtb25hbW91ciIsImEiOiJja29laTQ4YzMwNW5jMnZsejZkMWNxMW1nIn0.FZF-e-4X_LuaFTbc199few'
}).addTo(mymap);

var marker = L.marker([32.049357, 34.758355]).addTo(mymap);