import React from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";

function Home() {
    return (
        (sessionExpired()) ?
            <Redirect to="/login" /> :
            <div className='home'>
                Bienvenido!
            </div>
    );
}

export default Home;