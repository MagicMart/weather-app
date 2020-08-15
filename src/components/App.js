import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Header from "./Header";
import Home from "./Home";

function Loading(props) {
    return <h2 className="weather-container">Loading</h2>;
}

const Forecast = loadable(() => import("./Forecast"), {
    fallback: <Loading />,
});

const Details = loadable(() => import("./Details"), {
    fallback: <Loading />,
});

function App() {
    return (
        <Router>
            <React.StrictMode>
                <Header />
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/forecast">
                            <Forecast />
                        </Route>
                        <Route path="/details">
                            <Details />
                        </Route>
                        <Route path="/404">
                            <h2 className="weather-container">
                                Page Not Found
                            </h2>
                        </Route>
                    </Switch>
                </div>
            </React.StrictMode>
        </Router>
    );
}

export default App;
