import React from "react";
import { Link } from "react-router-dom";

class LocationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.cleanString = this.cleanString.bind(this);
    }

    cleanString(str) {
        return str
            .trim()
            .split(" ")
            .filter(el => el !== "")
            .join(" ");
    }

    checkInput(str) {
        const city = str.toLowerCase();
        const chars = " abcdefghijklmnopqrstuvwxyz,-";
        for (let char of city) {
            if (!chars.includes(char)) {
                return false;
            }
        }
        return true;
    }

    handleChange(e) {
        const city = e.target.value;
        this.checkInput(city) && this.setState({ city });
    }
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <form className="column" onSubmit={this.handleSubmit}>
                    <label hidden={true} htmlFor="city">
                        Enter City:
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        autoComplete="off"
                        placeholder="Enter City..."
                    />
                    <Link
                        disabled={!this.state.city}
                        to={{
                            pathname: "/forecast",
                            search: `?=${this.cleanString(this.state.city)}`
                        }}
                    >
                        <button
                            type="submit"
                            disabled={!this.state.city}
                            className="button"
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
