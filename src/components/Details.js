import React from "react";
import api from "../utils/api";

function DetailDisplay({ name, country, details }) {
    return (
        <div className="weather-container">
            <h2>{`${name}, ${country} `}</h2>
            <p>{JSON.stringify(details)}</p>
            <ul>
                <li>{api.handleDate(details.dt_txt).day}</li>
                <li>{api.handleDate(details.dt_txt).time}</li>
            </ul>
        </div>
    );
}

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: null
        };
    }

    componentDidMount() {
        if (!this.props.location.query) {
            return;
        }
        const { query } = this.props.location;
        const details = query.details;
        const name = query.name;
        const country = query.country;
        details && this.setState({ details, name, country });
    }

    render() {
        return (
            <>
                {this.state.details ? (
                    <DetailDisplay
                        name={this.state.name}
                        country={this.state.country}
                        details={this.state.details}
                    />
                ) : (
                    <div className="weather-container" />
                )}
            </>
        );
    }
}

export default Details;
