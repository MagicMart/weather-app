import React from "react";
import api from "../utils/api";

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            forecast: null
        };
    }

    componentDidMount() {
        console.log("component did mount");
        const city = this.props.location.search;
        api.fetchFiveDay(city.split("=")[1].trim()).then(data =>
            this.setState({ city: city, forecast: data })
        );
    }

    componentDidUpdate(prevProps) {
        console.log(
            "preProps " +
                prevProps.location.search +
                " and this.props:" +
                this.props.location.search
        );
        console.log("this.state.city " + this.state.city);
        if (this.props.location.search === this.state.city) {
            return;
        }
        const city = this.props.location.search;
        api.fetchFiveDay(city.split("=")[1].trim()).then(data =>
            this.setState({ city: city, forecast: data })
        );
        console.log("component did update");
    }
    render() {
        return (
            <>
                {this.state.forecast && (
                    <div className="weather-container">
                        <h2>
                            {this.state.forecast.city.name +
                                ", " +
                                this.state.forecast.city.country}
                        </h2>

                        <ul>
                            {this.state.forecast.list
                                .filter((el, i) => i % 4 === 0)
                                .map((el, i) => (
                                    <li key={el + i}>
                                        <div
                                            className={`icon-${
                                                el.weather[0].icon
                                            } icon`}
                                        />
                                        <p>{el.weather[0].description}</p>
                                        <p>{el.dt_txt}</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </>
        );
    }
}

export default Forecast;
