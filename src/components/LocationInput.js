import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

function LocationInput({ history }) {
    const [city, setCity] = React.useState("");
    const places = React.createRef();
    const lat = React.useRef();
    const lng = React.useRef();

    React.useEffect(() => {
        const dropdown = new google.maps.places.Autocomplete(places.current);

        dropdown.addListener("place_changed", () => {
            const place = dropdown.getPlace();

            console.log("Place", place.formatted_address);
            lat.current = place.geometry.location.lat();
            lng.current = place.geometry.location.lng();
            setCity(place.formatted_address);
        });
    }, []);

    const handleSubmit = (e) => {
        history.push({
            pathname: "/forecast",
            search: `lat=${lat.current}&lng=${lng.current}`,
        });
        places.current.value = "";
        e.preventDefault();
    };

    return (
        <>
            <form className="column" onSubmit={handleSubmit}>
                <input
                    ref={places}
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="off"
                    placeholder="Enter City..."
                    aria-label="Enter city"
                />

                <input
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
