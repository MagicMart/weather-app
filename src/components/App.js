import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Forecast from "./Forecast";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/forecast" component={Forecast} />
                        <Route render={() => <p>Not Found</p>} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
