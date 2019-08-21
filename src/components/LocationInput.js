import React from "react";
import {Link} from "react-router-dom";

class LocationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.cleanString = this.cleanString.bind(this);
        this.emptyTextInput = this.emptyTextInput.bind(this);
    }

    cleanString(str) {
        return str
            .trim()
            .split(" ")
            .filter(el => el !== "")
            .join(" ");
    }

    checkInput(str) {
        const city = str.toLowerCase().split("");
        const acceptedChars = " abcdefghijklmnopqrstuvwxyz,-";
        return city.every(letter => acceptedChars.includes(letter));
    }

    handleChange(e) {
        const city = e.target.value;
        this.checkInput(city) && this.setState({city});
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    emptyTextInput() {
        this.setState({city: ""});
    }

    render() {
        return (
            <>
                <form className="column" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        autoComplete="off"
                        placeholder="Enter City..."
                        aria-label="Enter city"
                    />
                    <Link
                        onClick={this.emptyTextInput}
                        role="button"
                        disabled={!this.state.city}
                        to={{
                            pathname: "/forecast",
                            search: `?=${this.cleanString(this.state.city)}`
                        }}
                    >
                        <button
                            type="submit"
                            id="getWeather"
                            disabled={!this.state.city}
                            className="button"
                            aria-label="Get Weather"
                        >
                            Get Weather
                        </button>
                    </Link>
                </form>
            </>
        );
    }
}

export default LocationInput;
