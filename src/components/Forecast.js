import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import api from "../utils/api";

function Icon({ forecast, handleDate, match }) {
    console.log(match);
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
                                    {handleDate(el.dt_txt).day}
                                </p>
                                <p className="description">
                                    <em>{el.weather[0].description}</em>
                                </p>

                                <p className="time">
                                    {handleDate(el.dt_txt).time}
                                </p>
                            </li>
                        </Link>
                    ))}
            </ul>
        </div>
    );
}

Icon.propTypes = {
    forecast: PropTypes.object.isRequired,
    handleDate: PropTypes.func.isRequired
};

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            forecast: null
        };

        this.cleanCityString = this.cleanCityString.bind(this);
        this.handleDate = this.handleDate.bind(this);
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

    handleDate(str) {
        const date = new Date(str);
        const arr = date.toString().split(" ");
        const day = arr.slice(0, 3).join(" ");
        const time = arr[4]
            .split(":")
            .slice(0, 2)
            .join(":");
        return { day, time };
    }

    render() {
        return (
            <>
                {this.state.forecast ? (
                    <Icon
                        handleDate={this.handleDate}
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
