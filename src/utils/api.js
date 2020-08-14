import memoize from "memoizee";

function handleError(error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error.response;
}

const endpoint =
    "https://vh7fs6xb15.execute-api.eu-west-2.amazonaws.com/fetchforecast?";

const fetchForecast = memoize(
    function FiveDay(lat, lng) {
        const url = `${endpoint}lat=${lat}&lng=${lng}`;

        return fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res;
            })
            .then((res) => res.json())
            .then((data) => data)
            .catch(handleError);
    },
    { maxAge: 600000 } // 10mins
);

export default {
    fetchForecast,
};
