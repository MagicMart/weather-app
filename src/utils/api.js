import axios from "axios";

const APIkey = "3d7abca039d3fb9e0340ec05e86f1c55";

function fetchForecast(city) {
    const url = window.encodeURI(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`
    );
    return axios.get(url).then(function(response) {
        return response.data;
    });
}

function fetchFiveDay(city) {
    console.log("fetchFiveDay param: " + city);
    const url = window.encodeURI(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APIkey}`
    );
    console.log(url);
    return axios.get(url).then(function(response) {
        return response.data;
    });
}

export default {
    fetchForecast,
    fetchFiveDay
};
