import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./components/auth/auth-provider";
import About from "./pages/about";
import Connect from "./pages/connect";
import Explorer from "./pages/explorer";
import Home from "./pages/home";

import "@fortawesome/fontawesome-free/css/all.css";
import "bulma";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/connect" component={Connect} />
                <Route path="/explorer" component={Explorer} />
            </Router>
        </AuthProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
