import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {cleanString} from "../utils/helpers";

class LocationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.emptyTextInput = this.emptyTextInput.bind(this);
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

                    <button
                        onClick={() =>
                            this.props.history.push({
                                pathname: "/forecast",
                                search: `?=${cleanString(this.state.city)}`
                            })
                        }
                        type="submit"
                        id="getWeather"
                        disabled={!this.state.city}
                        className="button"
                        aria-label="Get Weather"
                    >
                        Get Weather
                    </button>
                </form>
            </>
        );
    }
}

LocationInput.propTypes = {
    history: PropTypes.object.isRequired,
    push: PropTypes.func
};

const LocationInputWithRouter = withRouter(LocationInput);

export default LocationInputWithRouter;
