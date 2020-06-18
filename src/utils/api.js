import memoize from "memoizee";
import { API_KEY } from "./key";

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error.response;
}

const api = "https://api.openweathermap.org/data/2.5";

const fetchForecast = memoize(
    function FiveDay(loc) {
        const url = `${api}/forecast?lat=${loc.lat}&lon=${loc.lng}&appid=${API_KEY}`;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data)
            .catch(handleError);
    },
    { maxAge: 600000 }
);

export default {
    fetchForecast,
};
