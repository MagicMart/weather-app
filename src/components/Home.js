import React from "react";
import { Redirect } from "react-router-dom";
import useGeolocation from "./useGeolocation";

function Home() {
    const [coords] = useGeolocation();

    if (coords.lat) {
        return (
            <Redirect to={`/forecast?lat=${coords.lat}&lng=${coords.lng}`} />
        );
    }

    return (
        <div role="main" className="weather-container">
            <div className="message">
                <p className="example">
                    Example input: <kbd>london,gb</kbd>
                </p>
            </div>
        </div>
    );
}

export default Home;
