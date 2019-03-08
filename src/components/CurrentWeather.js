import React from "react";
import api from "../utils/api";
import image from "../images/weather-icons/10n.svg";

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
        api.fetchForecast(
            city
                .split("=")[1]
                .split(" ")
                .join()
        ).then(data => this.setState({ city: city, forecast: data }));
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
        api.fetchForecast(
            city
                .split("=")[1]
                .split(" ")
                .join()
        ).then(data => this.setState({ city: city, forecast: data }));
        console.log("component did update");
    }
    render() {
        console.log(this.state.forecast);
        return (
            <>
                {this.state.forecast && (
                    <div className="weather-container">
                        <h3>Forecast</h3>
                        <p>{this.state.city.split("=")[1]}</p>

                        {/* <ul>
                <li>{JSON.stringify(this.state.forecast)}</li>
                {this.state.forecast &&
                    this.state.forecast.weather[0].description}
            </ul> */}

                        <div
                            className={`icon-${
                                this.state.forecast.weather[0].icon
                            } icon`}
                        />
                    </div>
                )}
            </>
        );
    }
}

export default Forecast;
