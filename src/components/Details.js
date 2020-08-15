import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { handleDate } from "../utils/helpers";
import PropTypes from "prop-types";

function DetailDisplay({ name, country, details }) {
    const {
        dt_txt,
        main: { humidity, temp_max, temp_min },
        weather: [{ description, icon }],
        wind: { deg, speed },
    } = details;
    return (
        <div role="main" className="weather-container">
            <div className="detail-header">
                <div>
                    <h2>{`${name}, ${country} `}</h2>
                </div>
                <div className={`icon-detail icon-${icon}`} />
            </div>
            <table>
                <caption>Forecast</caption>
                <thead>
                    <tr>
                        <th scope="col">Field</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Day</th>
                        <td>{handleDate(dt_txt).day}</td>
                    </tr>
                    <tr>
                        <th scope="row">Time</th>
                        <td>{handleDate(dt_txt).time}</td>
                    </tr>
                    <tr>
                        <th scope="row">Description</th>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <th scope="row">Max Temp</th>
                        <td>{temp_max} &deg;C</td>
                    </tr>
                    <tr>
                        <th scope="row">Min Temp</th>
                        <td>{temp_min} &deg;C</td>
                    </tr>
                    <tr>
                        <th scope="row">Humidity</th>
                        <td>{humidity}</td>
                    </tr>
                    <tr>
                        <th scope="row">Wind</th>
                        <td>{speed}</td>
                    </tr>
                    <tr>
                        <th scope="row">Degree</th>
                        <td>{deg}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

DetailDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
};

function Details() {
    const location = useLocation();

    const state = React.useRef(location.state);

    if (!state.current) {
        return <Redirect to="/404" />;
    }
    // @ts-ignore
    const { name, country, details } = state.current;

    return (
        <>
            {location.state && (
                <DetailDisplay
                    name={name}
                    country={country}
                    details={details}
                />
            )}
        </>
    );
}

export default Details;
