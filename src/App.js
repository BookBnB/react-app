import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "./login/Login";
import RedirectComponent from "./RedirectComponent";
import Home from "./home/Home";

export const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/register" component={() => <Home initialValue={0} />} />
                <Route exact path="/users-list" component={() => <Home initialValue={1} />} />
                <Route exact path="/" component={RedirectComponent}/>
            </Switch>
        </div>
    );
};