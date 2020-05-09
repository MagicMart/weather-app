import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

function LocationInput({ history }) {
    const [city, setCity] = React.useState("");
    const buttonRef = React.useRef();
    const placesRef = React.useRef();
    const lat = React.useRef();
    const lng = React.useRef();

    React.useEffect(() => {
        const dropdown = new google.maps.places.Autocomplete(placesRef.current);

        dropdown.addListener("place_changed", () => {
            const place = dropdown.getPlace();
            if (!place.formatted_address) return;
            lat.current = place.geometry.location.lat();
            lng.current = place.geometry.location.lng();
            setCity(place.formatted_address);
            buttonRef.current.focus()
        });
    }, []);

    const handleSubmit = (e) => {
        if (!city) return;
        history.push({
            pathname: "/forecast",
            search: `lat=${lat.current}&lng=${lng.current}`,
        });
        // removes text input field
        placesRef.current.value = "";
        lat.current = undefined;
        lng.current = undefined;
        setCity("");
        placesRef.current.focus();
        e.preventDefault();
    };

    return (
        <>
            <form className="column" onSubmit={handleSubmit}>
                <input
                    ref={placesRef}
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="off"
                    placeholder="Enter City..."
                    aria-label="Enter city"
                />

                <input
                    ref={buttonRef}
                    type="submit"
                    id="getWeather"
                    disabled={!city}
                    className="button"
                    aria-label="Get Weather"
                    value="Get Weather"
                />
            </form>
        </>
    );
}

LocationInput.propTypes = {
    history: PropTypes.object.isRequired,
    push: PropTypes.func,
};

const LocationInputWithRouter = withRouter(LocationInput);

export default LocationInputWithRouter;
