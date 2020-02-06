const weather = document.querySelector(".js-weather");

const API_KEY = "658458d1ff201e5e1730feed0973d3e3";
const COORDS = "coords";

function getWeater(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃ @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,   // =latitude : latitude
        longitude
    };
    saveCoords(coordsObj);
    getWeater(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords)
        const lat = parseCoords.latitude;
        const lng = parseCoords.longitude;
        getWeater(lat,lng);
    }
}

function init(){
    loadCoords();
}

init();