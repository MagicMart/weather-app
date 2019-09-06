import React from "react";
import LocationInput from "./LocationInput";

function Header() {
    return (
        <header role="banner" className="header">
            <h1>
                Weather App <span style={{fontSize: "32px"}}>&#127774;</span>
            </h1>
            <LocationInput />
        </header>
    );
}

export default Header;
