import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

function Loading(props) {
    return <h2 className="weather-container">Loading</h2>;
}

const Forecast = React.lazy(() => import("./Forecast"));
const Details = React.lazy(() => import("./Details"));

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

                        <React.Suspense fallback={<Loading />}>
                            <Route path="/forecast">
                                <Forecast />
                            </Route>
                            <Route path="/details">
                                <Details />
                            </Route>
                        </React.Suspense>

                        <Route path="/404">
                            <h2 role="main" className="weather-container">
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
