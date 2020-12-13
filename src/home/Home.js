import React, {useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';
import sessionExpired from "../util/sessionExpired";
import AppBar from "@material-ui/core/AppBar";
import * as PropTypes from "prop-types";
import AddUserIcon from '@material-ui/icons/PersonAdd';
import UserIcon from '@material-ui/icons/Person';
import PublicationIcon from '@material-ui/icons/FilterNone';
import ServiceIcon from '@material-ui/icons/SettingsApplications';
import MetricIcon from '@material-ui/icons/Equalizer';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UsersPage from "../users/UsersPage";
import TabPanel from "../util/TabPanel";
import a11yProps from "../util/a11yProps";
import RegisterPage from "../register/RegisterPage";
import Button from "@material-ui/core/Button/Button";
import './home.css';
import Popup from "../popup/Popup";
import Cookie from "js-cookie";

Home.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};

export default function Home({expired, initialValue}) {

    const history = useHistory();
    const [value, setValue] = useState(initialValue);
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
        setShowPopup(false);
    };

    const closeSession = () => {
        setShowPopup(false);
        localStorage.removeItem("expirationDate");
        Cookie.remove('token');
        history.push("/login");
    };

    const popupOptions = [{
            "text": "No",
            "clickHandler": closePopup
        },
        {
            "text": "Sí",
            "clickHandler": closeSession
        }]

    const sExpired = (expired !== undefined) ? expired : sessionExpired();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const showCloseSessionPopup = () => {
        setShowPopup(true);
    };

    return (
        (sExpired) ?
            <Redirect to="/login"/> :
            <div className='home'>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        indicatorColor="primary"
                        textColor="primary">
                        <Tab label="Registro administradores" icon={<AddUserIcon />} {...a11yProps(0)} />
                        <Tab label="Usuarios" icon={<UserIcon />} {...a11yProps(1)} />
                        <Tab label="Publicaciones" icon={<PublicationIcon />} {...a11yProps(2)} />
                        <Tab label="Servicios" icon={<ServiceIcon />} {...a11yProps(3)} />
                        <Tab label="Métricas" icon={<MetricIcon />} {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <RegisterPage />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UsersPage />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Publicaciones
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Servicios
                </TabPanel>
                <TabPanel value={value} index={4}>
                    Metricas
                </TabPanel>
                <Button id="close-session-button" variant="contained" color="primary" onClick={showCloseSessionPopup}>Cerrar sesión</Button>
                {showPopup ? <Popup text="Estás seguro que deseas cerrar sesión?" options={popupOptions}/> : null}
            </div>
    );
}