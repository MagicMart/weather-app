import axios from "axios";
import memoize from "memoizee";

let APIKEY;

if (process.env.NODE_ENV === "production") {
    APIKEY = process.env.API_KEY;
} else {
    APIKEY = process.env.API_KEY_DEV;
}

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error.response;
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

const memoized = memoize(fetchFiveDay, { maxAge: 600000 });

export default {
    fetchForecast,
    memoized,
};
