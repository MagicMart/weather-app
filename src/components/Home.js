import React from "react";

import LocationInput from "./LocationInput";

function Home() {
    return (
        <div className="weather-container">
            <div className="home-input">
                <LocationInput />
            </div>
            <div className="message">
                <h2>Get Weather</h2>
            </div>
        </div>
    );
}

export default Home;
