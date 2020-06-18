import axios from "axios";
import memoize from "memoizee";

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error.response;
}

const fetchForecast = memoize(
    function FiveDay(loc) {
        const { lat, lng } = loc;
        const url = `https://vh7fs6xb15.execute-api.eu-west-2.amazonaws.com/fetchforcast?lat=${lat}&lng=${lng}`;
        return axios
            .get(url)
            .then(function (response) {
                return response.data;
            })
            .catch(handleError);
    },
    { maxAge: 600000 }
);

export default {
    fetchForecast,
};
