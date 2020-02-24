import axios from "axios";
import memoize from "memoizee";
import { API_KEY } from "./key";

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error.response;
}

// function fetchForecast(city) {
//     const url = window.encodeURI(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`
//     );
//     return axios.get(url).then(function(response) {
//         return response.data;
//     });
// }

// API call:
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={your api key}
// Parameters:
// lat, lon coordinates of the location of your interest
// Examples of API calls:
// api.openweathermap.org/data/2.5/forecast?lat=35&lon=139

export const fiveDayForecast = memoize(
    function fetchFiveDay({ city, coords }) {
        const { lat, lng } = coords;
        let url;
        if (city) {
            url = window.encodeURI(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
            );
        } else {
            url = window.encodeURI(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}`
            );
        }

        return axios
            .get(url)
            .then(function(response) {
                return response.data;
            })
            .catch(handleError);
    },
    { maxAge: 600000 }
);
