import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import api from "../utils/api";

function Icon({ forecast }) {
    const {
        city: { name, country },
        list
    } = forecast;
    return (
        <div className="weather-container">
            <h2>{name + ", " + country}</h2>

            <ul>
                {list
                    .filter((el, i) => i % 4 === 0)
                    .map((el, i) => (
                        <Link
                            key={el + i}
                            to={{
                                pathname: `/details/${name}`,
                                query: {
                                    name: name,
                                    country: country,
                                    details: el
                                }
                            }}
                        >
                            <li>
                                <div
                                    className={`icon-${
                                        el.weather[0].icon
                                    } icon`}
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
                            </li>
                        </Link>
                    ))}
            </ul>
        </div>
    );
}

Icon.propTypes = {
    forecast: PropTypes.object.isRequired
};

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            forecast: null
        };

        this.cleanCityString = this.cleanCityString.bind(this);
    }

    cleanCityString(str) {
        return str
            .split("=")[1]
            .split(" ")
            .filter(el => el !== "")
            .join(" ");
    }

    componentDidMount() {
        const city = this.props.location.search.replace("%20", " ");

        api.memoized(this.cleanCityString(city)).then(data =>
            this.setState({ city: city, forecast: data })
        );
    }

    componentDidUpdate() {
        const {
            location: { search }
        } = this.props;

        if (search === this.state.city) {
            return;
        }
        const city = search;
        api.memoized(this.cleanCityString(city)).then(data =>
            this.setState({ city: city, forecast: data })
        );
    }

    render() {
        return (
            <>
                {this.state.forecast ? (
                    <Icon
                        cleanCityString={this.cleanCityString}
                        forecast={this.state.forecast}
                    />
                ) : (
                    <p className="weather-container">Loading</p>
                )}
            </>
        );
    }
}

Forecast.propTypes = {
    location: PropTypes.object.isRequired
};

export default Forecast;
