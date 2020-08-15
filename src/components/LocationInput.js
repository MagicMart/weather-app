import React from "react";
import { useHistory } from "react-router-dom";

function LocationInput() {
    const [city, setCity] = React.useState("");
    const history = useHistory();
    const submitRef = React.useRef();
    const searchRef = React.useRef();
    const lat = React.useRef();
    const lng = React.useRef();

    React.useEffect(() => {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        const dropdown = new google.maps.places.Autocomplete(searchRef.current);

        dropdown.addListener("place_changed", () => {
            const place = dropdown.getPlace();
            if (!place.formatted_address) return;
            lat.current = place.geometry.location.lat();
            lng.current = place.geometry.location.lng();
            setCity(place.formatted_address);
        });
    }, []);

    const handleSubmit = (e) => {
        if (!city) return;
        history.push({
            pathname: "/forecast",
            search: `lat=${lat.current}&lng=${lng.current}`,
        });
        // removes text input field
        // @ts-ignore
        searchRef.current.value = "";
        lat.current = undefined;
        lng.current = undefined;
        setCity("");
        e.preventDefault();
    };

    return (
        <>
            <form className="column" onSubmit={handleSubmit}>
                <input
                    ref={searchRef}
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="off"
                    placeholder="Enter City..."
                    aria-label="Enter city"
                />

                <input
                    ref={submitRef}
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

export default LocationInput;
