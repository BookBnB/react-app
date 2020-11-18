import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import jwt from 'jwt-decode';
import './login.css';
import sessionExpired from "../util/sessionExpired";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

function Login() {

    const history = useHistory();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const [mailInvalid, setMailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    function validateFieldsAndLogin() {
        setMailInvalid(mail === '');
        setPasswordInvalid(password === '');

        if (mail !== '' && password !== '') {
            login();
        }

    }

    function login() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/sesiones', {
            method: 'POST',
            body: JSON.stringify({email: mail, password: password}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
            console.log(response);
            if (response.message) {
                setErrorMessage(response.message)
            } else if (response.token) {
                loginSuccesful(response.token);
            }
        });

    }

    function loginSuccesful(token) {
        alert("Login exitoso");
        const session = jwt(token);
        console.log(session);
        localStorage.setItem('expirationDate', session.exp);
        history.push("/home");
    }

    function handleMailChange(event) {
        setMailInvalid(false);
        setMail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPasswordInvalid(false);
        setPassword(event.target.value);
    }

    return (
        (sessionExpired()) ?
            <div className='login'>
                <div className="mail">
                    <TextField id="mail" label="Mail" variant="outlined"
                               error={mailInvalid} helperText={mailInvalid && "El mail no puede estar vacío"}
                               onChange={handleMailChange} />
                </div>

                <div className="password">
                    <TextField id="password" label="Contraseña" variant="outlined"
                               error={passwordInvalid} helperText={passwordInvalid && "La contraseña no puede estar vacío"}
                               type="password" onChange={handlePasswordChange} />
                </div>

                <Button variant="contained" color="primary" onClick={validateFieldsAndLogin}>Ingresar</Button>

                <div id="error-message" className="error-message">{errorMessage}</div>
            </div> : <Redirect to="/home" />
    );

}

export default Login;
