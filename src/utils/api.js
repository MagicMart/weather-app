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

export const fiveDayForecast = memoize(
    function fetchFiveDay(city) {
        const url = window.encodeURI(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${API_KEY}`
        );

        return axios
            .get(url)
            .then(function(response) {
                return response.data;
            })
            .catch(handleError);
    },
    { maxAge: 600000 }
);
