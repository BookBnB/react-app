import { Redirect } from "react-router-dom";
import React from "react";


function RedirectComponent() {

    let expirationDate = localStorage.getItem("expirationDate");
    let currentTime = new Date().getTime() / 1000;

    return (
        (!expirationDate || currentTime > expirationDate) ?
            <Redirect to="/login" /> :
            <Redirect to="/home" />
    );
}

export default RedirectComponent;