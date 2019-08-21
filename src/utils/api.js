import axios from "axios";
import memoize from "memoizee";
import {APIKEY} from "./key.js";

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return null;
}

function fetchForecast(city) {
    const url = window.encodeURI(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${APIKEY}`
    );
    return axios.get(url).then(function(response) {
        return response.data;
    });
}

function fetchFiveDay(city) {
    const url = window.encodeURI(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${APIKEY}`
    );

    return axios
        .get(url)
        .then(function(response) {
            return response.data;
        })
        .catch(handleError);
}

function handleDate(str) {
    const date = new Date(str);
    const day = date.toDateString().slice(0, 10);
    const time = date.toTimeString().slice(0, 5);

    return {day, time};
}

const memoized = memoize(fetchFiveDay, {maxAge: 600000});

export default {
    fetchForecast,
    memoized,
    handleDate
};
