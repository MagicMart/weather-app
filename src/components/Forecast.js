import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fetchForecast } from "../utils/api";
import { handleDate, cleanSearchString } from "../utils/helpers";
import queryString from "query-string";
import useGeolocation from "./useGeolocation";

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
    const [coords] = useGeolocation();

    React.useEffect(() => {
        const { city } = queryString.parse(location.search);
        if (city || coords.lat) {
            fetchForecast(city || coords).then(data => {
                setForecast(data);
            });
        }

        return () => setForecast(null);
    }, [props.location, coords]);

    if (!forecast) {
        return <h2 className="weather-container">Loading</h2>;
    }
    return (
        <>
            {forecast.status === undefined ? (
                <Icon
                    cleanSearchString={cleanSearchString}
                    forecast={forecast}
                />
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
