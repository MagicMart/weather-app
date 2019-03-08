import axios from "axios";

const APIkey = "3d7abca039d3fb9e0340ec05e86f1c55";

function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`;
    return axios.get(url).then(function(response) {
        return response.data;
    });
}

function fetchFiveDay(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${APIkey}`;
    return axios.get(url).then(function(response) {
        return response.data;
    });
}

export default {
    fetchForecast,
    fetchFiveDay
};
