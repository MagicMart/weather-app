import axios from "axios";

export default {
    fetchForecast: function(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3d7abca039d3fb9e0340ec05e86f1c55`;
        return axios.get(url).then(function(response) {
            return response.data;
        });
    }
};
