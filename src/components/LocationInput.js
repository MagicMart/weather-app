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
    }

    checkInput(city) {
        const cityLowerCase = city.toLowerCase();
        const chars = " abcdefghijklmnopqrstuvwxyz,";
        for (let el of cityLowerCase) {
            if (!chars.includes(el)) {
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
                    <label htmlFor="city">Enter City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    <Link
                        disabled={!this.state.city}
                        to={{
                            pathname: "/forecast",
                            search: `?=${this.state.city.trim()}`
                        }}
                    >
                        <button disabled={!this.state.city} className="button">
                            Get Weather
                        </button>
                    </Link>
                </form>
            </>
        );
    }
}

export default LocationInput;
