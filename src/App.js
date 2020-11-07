import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";

export const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component={Home}/>
            </Switch>
        </div>
    );
};