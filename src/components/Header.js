import React from "react";
import { Link } from "react-router-dom";
import LocationInput from "./LocationInput";

function Header() {
    return (
        <header role="banner" className="header">
            <h1>
                <Link to="/" style={{ color: "var(--black)" }}>
                    Weather App
                </Link>{" "}
                <span style={{ fontSize: "32px" }}>&#127774;</span>
            </h1>
            <LocationInput />
        </header>
    );
}

export default Header;
