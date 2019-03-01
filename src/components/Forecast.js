import React from "react";

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
    }

    componentDidMount() {
        const city = this.props.location.search;
        this.setState({ city });
    }

    componentDidUpdate() {
        if (this.props.location.search === this.state.city) {
            return;
        }
        const city = this.props.location.search;
        console.log(city);
        this.setState({ city });
    }
    render() {
        return (
            <div className="weather-container">
                <h3>Forecast</h3>
                <p>{this.state.city.split("=")[1]}</p>
            </div>
        );
    }
}

export default Forecast;
