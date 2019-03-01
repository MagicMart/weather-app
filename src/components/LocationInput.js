import React from "react";
import { Link } from "react-router-dom";

class LocationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const city = e.target.value;
        this.setState({ city });
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
                        className="button"
                        disabled={!this.state.city}
                        to={{
                            pathname: "/forecast",
                            search: `?=${this.state.city}`
                        }}
                    >
                        Get Weather
                    </Link>
                </form>
            </>
        );
    }
}

export default LocationInput;
