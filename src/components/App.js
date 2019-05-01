import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import loadable from "@loadable/component";
import Header from "./Header";
import Home from "./Home";

const Forecast = loadable(() => import("./Forecast"), {
    fallback: <h2>Loading</h2>
});
const Details = loadable(() => import("./Details"), {
    fallback: <h2>Loading</h2>
});

// import Details from "./Details";

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
