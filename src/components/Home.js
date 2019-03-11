import React from "react";

import LocationInput from "./LocationInput";

function Home() {
    return (
        <div className="weather-container">
            <div className="home-input">
                <LocationInput />
            </div>
            <div className="message">
                <p className="example">
                    Example input: <samp>london,gb</samp>
                </p>
            </div>
        </div>
    );
}

export default Home;
