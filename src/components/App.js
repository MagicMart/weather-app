import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";
import Header from "./Header";
import Home from "./Home";

function Loading(props) {
    return <h2 className="weather-container">Loading</h2>;
}

const Forecast = loadable(() => import("./Forecast"), {
    fallback: <Loading />
});
const Details = loadable(() => import("./Details"), {
    fallback: <Loading />
});

function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        path="/forecast"
                        render={props => <Forecast {...props} />}
                    />
                    <Route
                        path="/details"
                        render={props => <Details {...props} />}
                    />
                    <Route render={() => <p>Not Found</p>} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
