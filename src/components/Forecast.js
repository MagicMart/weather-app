import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import api from "../utils/api";

function Icon({forecast}) {
    const {
        city: {name, country},
        list
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
                                    pathname: `/details/${name}`,
                                    state: {
                                        name: name,
                                        country: country,
                                        details: el
                                    }
                                }}
                            >
                                <div
                                    className={`icon-${el.weather[0].icon} icon`}
                                />
                                <p className="day">
                                    {api.handleDate(el.dt_txt).day}
                                </p>
                                <p className="description">
                                    <em>{el.weather[0].description}</em>
                                </p>

                                <p className="time">
                                    {api.handleDate(el.dt_txt).time}
                                </p>
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

Icon.propTypes = {
    forecast: PropTypes.object.isRequired
};

function Forecast(props) {
    const [forecast, setForecast] = React.useState(null);

    const cleanCityString = str => {
        if (!str) {
            return;
        }
        return str
            .replace("%20", " ")
            .split("=")[1]
            .split(" ")
            .filter(el => el !== "")
            .join(" ");
    };

    React.useEffect(() => {
        const {search} = props.location;
        api.memoized(cleanCityString(search)).then(data => {
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
                <Icon cleanCityString={cleanCityString} forecast={forecast} />
            ) : (
                <h2 className="weather-container">Not Found</h2>
            )}
        </>
    );
}

Forecast.propTypes = {
    location: PropTypes.object.isRequired
};

export default Forecast;
