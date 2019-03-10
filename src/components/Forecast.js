import React from "react";
import api from "../utils/api";

function Icon(props) {
    const {
        city: { name, country },
        list
    } = props.forecast;
    return (
        <div className="weather-container">
            <h2>{name + ", " + country}</h2>

            <ul>
                {list
                    .filter((el, i) => i % 4 === 0)
                    .map((el, i) => (
                        <li key={el + i}>
                            <div
                                className={`icon-${el.weather[0].icon} icon`}
                            />
                            <p className="description">
                                {el.weather[0].description}
                            </p>
                            <p className="date">
                                {props.handleDate(el.dt_txt)}
                            </p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

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
        console.log("component did mount");
        const city = this.props.location.search.replace("%20", " ");
        api.fetchFiveDay(this.cleanCityString(city)).then(data =>
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
        api.fetchFiveDay(this.cleanCityString(city)).then(data =>
            this.setState({ city: city, forecast: data })
        );
        console.log("component did update");
    }

    handleDate(str) {
        const date = new Date(str);
        const arr = date.toString().split(" ");
        console.log(arr);
        const pick = arr.slice(0, 3).join(" ") + arr[6];
        return pick;
    }

    render() {
        console.log("The city " + this.state.city);
        return (
            <>
                {this.state.forecast && (
                    <Icon
                        handleDate={this.handleDate}
                        cleanCityString={this.cleanCityString}
                        forecast={this.state.forecast}
                    />
                )}
            </>
        );
    }
}

export default Forecast;
