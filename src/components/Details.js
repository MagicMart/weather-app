import React from "react";

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: null
        };
    }

    componentDidMount() {
        const details = this.props.location.query.details;
        this.setState({ details });
    }

    render() {
        return <p>{JSON.stringify(this.state.details)}</p>;
    }
}

export default Details;
