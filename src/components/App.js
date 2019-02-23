import React from "react";
import Header from "./Header";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // this.props.onSubmit(this.props.id, this.state.username);
    }

    handleChange(e) {
        const city = e.target.value;
        this.setState({ city });
    }

    render() {
        return (
            <div className="container">
                <Header />
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
            </div>
        );
    }
}

export default App;
