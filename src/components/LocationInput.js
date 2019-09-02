import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {removeExtraSpace} from "../utils/helpers";

function LocationInput({history}) {
    const [city, setCity] = React.useState("");

    const checkInput = str => {
        const input = str.toLowerCase().split("");
        const acceptedChars = " abcdefghijklmnopqrstuvwxyz,-";
        return input.every(letter => acceptedChars.includes(letter));
    };

    const handleChange = e => {
        const input = e.target.value;
        checkInput(input) && setCity(input);
    };
    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <>
            <form className="column" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Enter City..."
                    aria-label="Enter city"
                />

                <button
                    onClick={() =>
                        history.push({
                            pathname: "/forecast",
                            search: `?=${removeExtraSpace(city)}`
                        })
                    }
                    type="submit"
                    id="getWeather"
                    disabled={!city}
                    className="button"
                    aria-label="Get Weather"
                >
                    Get Weather
                </button>
            </form>
        </>
    );
}

LocationInput.propTypes = {
    history: PropTypes.object.isRequired,
    push: PropTypes.func
};

const LocationInputWithRouter = withRouter(LocationInput);

export default LocationInputWithRouter;
