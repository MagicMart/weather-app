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
    const arr = date.toString().split(" ");
    const day = arr.slice(0, 3).join(" ");
    const time = arr[4]
        .split(":")
        .slice(0, 2)
        .join(":");
    return {day, time};
}

const memoized = memoize(fetchFiveDay, {maxAge: 600000});

export default {
    fetchForecast,
    memoized,
    handleDate
};
