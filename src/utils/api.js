import memoize from "memoizee";

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error.response;
}

const endpoint =
    "https://vh7fs6xb15.execute-api.eu-west-2.amazonaws.com/fetchforecast?";

const fetchForecast = memoize(
    function FiveDay(loc) {
        const url = `${endpoint}lat=${loc.lat}&lng=${loc.lng}`;

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
