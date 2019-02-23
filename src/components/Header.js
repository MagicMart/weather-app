import React from "react";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="header">
                <h1>Weather App</h1>

                <form>
                    <div>
                        <label htmlFor="city">Enter City:</label>
                        <input type="text" id="city" name="user_city" />
                    </div>
                </form>
            </header>
        );
    }
}

export default Header;
