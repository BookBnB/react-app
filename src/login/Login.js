import React, {useState} from 'react';
import './login.css';

function Login() {

    const [response, setResponse] = useState(null);

    function handleClick() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((r) => {
                setResponse(r);
            });

    }

    return (
        <div className='login'>
            <form className="login-form">
                <label htmlFor="mail">Mail</label>
                <input id="mail" name="mail" type="text"/>

                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="text"/>

                <button onClick={handleClick}>Ingresar</button>
            </form>
        </div>
    );

}

export default Login;
