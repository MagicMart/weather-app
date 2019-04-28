import React from "react";
import LocationInput from "./LocationInput";

function Header() {
    return (
        <header role="banner" className="header">
            <h1>Weather App</h1>
            <LocationInput />
        </header>
    );
}

export default Header;
