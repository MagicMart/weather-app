import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { handleDate } from "../utils/helpers";
import queryString from "query-string";

function Icon({ forecast }) {
    const {
        city: { name, country },
        list,
    } = forecast;
    return (
        <div role="main" className="weather-container">
            <h2>{name + ", " + country}</h2>

            <ul>
                {list
                    .filter((el, i) => i % 4 === 0)
                    .map((el, i) => (
                        <li key={el + i}>
                            <Link
                                className="card"
                                to={{
                                    pathname: "/details",
                                    state: {
                                        name: name,
                                        country: country,
                                        details: el,
                                    },
                                    search: `city=${name},${country}`,
                                }}
                            >
                                <div
                                    className={`icon-${el.weather[0].icon} icon`}
                                />
                                <p className="day">
                                    {handleDate(el.dt_txt).day}
                                </p>
                                <p className="description">
                                    <em>{el.weather[0].description}</em>
                                </p>

                                <p className="time">
                                    {handleDate(el.dt_txt).time}
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

Icon.propTypes = {
    forecast: PropTypes.object.isRequired,
};

function Forecast(props) {
    const [forecast, setForecast] = React.useState(null);

    React.useEffect(() => {
        const { lat, lng } = queryString.parse(location.search);
        if (!lat || !lng) return;
        api.fetchForecast({ lat, lng }).then((data) => {
            setForecast(data);
        });

        return () => setForecast(null);
    }, [props.location]);

    if (!forecast) {
        return <h2 className="weather-container">Loading</h2>;
    }
    return (
        <>
            {forecast.status === undefined ? (
                <Icon forecast={forecast} />
            ) : (
                <h2 className="weather-container">Not Found</h2>
            )}
        </>
    );
}

Forecast.propTypes = {
    location: PropTypes.object.isRequired,
};

export default Forecast;
