import React, {useState} from "react";
import jwtDecode from "jwt-decode";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import { useLocation } from "react-router-dom";
import './change-password.css';

function ChangePassword() {

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [repeatPasswordInvalid, setRepeatPasswordInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();

    function validateFieldsAndChangePassword() {
        setPasswordInvalid(password === '');
        setRepeatPasswordInvalid(repeatPassword !== password);

        if (password !== '' && repeatPassword === password) {
            changePassword();
        }

    }

    function changePassword() {

        const queryParams = new URLSearchParams(location.search);
        let jwt = queryParams.get("jwt");
        let session = jwtDecode(jwt);

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/usuarios/' + session.email + '/contrasena', {
            method: 'PUT',
            body: JSON.stringify({password: password}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': jwt
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                if (response.message) {
                    setErrorMessage(response.message)
                } else {
                    alert('La contraseña fue cambiada satisfactoriamente');
                }
            });

    }

    function handlePasswordChange(event) {
        setPasswordInvalid(false);
        setPassword(event.target.value);
    }

    function handleRepeatPasswordChange(event) {
        setRepeatPasswordInvalid(false);
        setRepeatPassword(event.target.value);
    }

    return (
        <div className='change-password'>
            <div className="new-password">
                <TextField id="new-password" label="Contraseña" variant="outlined"
                           error={passwordInvalid} helperText={passwordInvalid && "La contraseña no puede estar vacía"}
                           type="password" onChange={handlePasswordChange} />
            </div>
            <div className="repeat-new-password">
                <TextField id="repeat-new-password" label="Repetir Contraseña" variant="outlined"
                           error={repeatPasswordInvalid} helperText={repeatPasswordInvalid && "Las contraseñas no coinciden"}
                           type="password" onChange={handleRepeatPasswordChange} />
            </div>

            <Button id="change-password-button" variant="contained" color="primary" onClick={validateFieldsAndChangePassword}>Cambiar contraseña</Button>

            <div id="error-message" className="error-message">{errorMessage}</div>
        </div>
    );

}

export default ChangePassword;
