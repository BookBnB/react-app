import { Redirect } from "react-router-dom";
import React from "react";
import sessionExpired from "./util/sessionExpired";


function RedirectComponent() {

    return (
        (sessionExpired()) ?
            <Redirect to="/login" /> :
            <Redirect to="/home" />
    );
}

export default RedirectComponent;