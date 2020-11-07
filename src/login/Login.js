import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';

function Login() {

    const history = useHistory();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validateFieldsAndLogin() {
        if (mail === '') {
            setErrorMessage('El mail no puede estar vacío')
        } else if (password === '') {
            setErrorMessage('La contraseña no puede estar vacía')
        } else {
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
            } else {
                loginSuccesful();
            }
        });

    }

    function loginSuccesful() {
        alert("Login exitoso");
        history.push("/home");
    }

    function handleMailChange(event) {
        setMail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    return (
        <div className='login'>
            <div className="mail">
                <div>Mail</div>
                <input id="mail" name="mail" type="text" onChange={handleMailChange}/>
            </div>

            <div className="password">
                <div>Contraseña</div>
                <input id="password" name="password" type="password" onChange={handlePasswordChange}/>
            </div>

            <button onClick={validateFieldsAndLogin}>Ingresar</button>
            <div className="error-message">{errorMessage}</div>
        </div>
    );

}

export default Login;
