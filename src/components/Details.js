import React from "react";
import api from "../utils/api";
import PropTypes from "prop-types";

function DetailDisplay({ name, country, details }) {
    const {
        dt_txt,
        main: { humidity, temp_max, temp_min },
        weather: [{ description, icon }],
        wind: { deg, speed }
    } = details;
    return (
        <div className="weather-container">
            <div className="detail-header">
                <div>
                    <h2>{`${name}, ${country} `}</h2>
                </div>
                <div className={`icon-detail icon-${icon}`} />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Detail</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Day</td>
                        <td>{api.handleDate(dt_txt).day}</td>
                    </tr>
                    <tr>
                        <td>Time</td>
                        <td>{api.handleDate(dt_txt).time}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <td>Max Temp</td>
                        <td>{temp_max} &deg;C</td>
                    </tr>
                    <tr>
                        <td>Min Temp</td>
                        <td>{temp_min} &deg;C</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{humidity}</td>
                    </tr>
                    <tr>
                        <td>Wind</td>
                        <td>{speed}</td>
                    </tr>
                    <tr>
                        <td>Degree</td>
                        <td>{deg}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

DetailDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired
};

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

Details.propTypes = {
    location: PropTypes.string.isRequired
};

export default Details;
