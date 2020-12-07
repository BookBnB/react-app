import React, {useState} from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import './registerPage.css';

export default function RegisterPage({token}) {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [mail, setMail] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')

    const [nameInvalid, setNameInvalid] = useState(false)
    const [surnameInvalid, setSurnameInvalid] = useState(false)
    const [mailInvalid, setMailInvalid] = useState(false)
    const [phoneInvalid, setPhoneInvalid] = useState(false)

    function register() {

        let registerBody = {name: name, surname: surname, email: mail,
            role: "admin", password: "bookbnb2020"}

        if (city !== '') {
            registerBody.city = city;
        }

        if (phone !== '') {
            registerBody.phone = phone;
        }

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/usuarios', {
            method: 'POST',
            body: JSON.stringify(registerBody),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                console.log(response);
                if (response.message) {
                    registerError(response.message)
                } else if (response.token) {
                    registerSuccesful(response.token);
                }
            });

    }

    function registerError(message) {
        alert(message);
    }

    function registerSuccesful() {
        alert("Se registro correctamente al administrador " + name + " " + surname);
    }


    function validateFieldsAndRegister() {
        const phoneRegex = RegExp('^(\s*|\d+)$')
        const registerCondition = (name !== '' && surname !== '' && mail !== '' && phoneRegex.test(phone))

        setNameInvalid(name === '');
        setSurnameInvalid(surname === '');
        setMailInvalid(mail === '')
        setPhoneInvalid(!phoneRegex.test(phone))

        if (registerCondition) {
            register();
        }

    }

    function handleNameChange(event) {
        setNameInvalid(false);
        setName(event.target.value);
    }

    function handleSurnameChange(event) {
        setSurnameInvalid(false);
        setSurname(event.target.value);
    }

    function handleMailChange(event) {
        setMailInvalid(false);
        setMail(event.target.value);
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhoneInvalid(false);
        setPhone(event.target.value);
    }

    return (
        /*(sessionExpired()) ?
            <Redirect to="/login" /> :*/
            <div className='register-page'>
                <div className="register-name-surname">
                    <div className="register-name">
                        <TextField required id="name" label="Nombre" variant="outlined"
                                   error={nameInvalid} helperText={nameInvalid && "El nombre es un campo obligatorio"}
                                   onChange={handleNameChange} />
                    </div>
                    <div className="register-surname">
                        <TextField required id="surname" label="Apellido" variant="outlined"
                                   error={surnameInvalid} helperText={surnameInvalid && "El apellido es un campo obligatorio"}
                                   onChange={handleSurnameChange} />
                    </div>
                </div>
                <div className="register-mail">
                    <TextField fullWidth required id="mail" label="Mail" variant="outlined"
                               error={mailInvalid} helperText={mailInvalid && "El mail es un campo obligatorio"}
                               onChange={handleMailChange} />
                </div>
                <div className="register-city-phone">
                    <div className="register-city">
                        <TextField id="city" label="Ciudad" variant="outlined"
                                   onChange={handleCityChange} />
                    </div>
                    <div className="register-phone">
                        <TextField id="phone" label="Telefono" variant="outlined"
                                   error={phoneInvalid} helperText={phoneInvalid && "El telefono solo puede contener numeros"}
                                   onChange={handlePhoneChange} />
                    </div>
                </div>
                <Button id="register-button" variant="contained" color="primary" onClick={validateFieldsAndRegister}>Registrar administrador</Button>
            </div>
    );
}