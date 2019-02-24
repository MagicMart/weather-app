import React from "react";
import { Redirect } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            toForecast: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        // event.preventDefault();
        this.setState(() => ({ toForecast: true }));

        // this.props.onSubmit(this.props.id, this.state.username);
    }

    handleChange(e) {
        const city = e.target.value;
        this.setState({ city });
    }

    render() {
        if (this.state.toForecast === true) {
            return <Redirect to="/forecast" />;
        }
        return (
            <div className="weather-container">
                <form className="column" onSubmit={this.handleSubmit}>
                    <label htmlFor="city">Enter City:</label>
                    <input
                        type="text"
                        id="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                </form>
            </div>
        );
    }
}

export default Home;
