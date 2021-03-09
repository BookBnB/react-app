import React, {useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';
import sessionExpired from "../util/sessionExpired";
import AppBar from "@material-ui/core/AppBar";
import * as PropTypes from "prop-types";
import AddUserIcon from '@material-ui/icons/PersonAdd';
import UserIcon from '@material-ui/icons/Person';
import PublicationIcon from '@material-ui/icons/FilterNone';
import ServerIcon from '@material-ui/icons/SettingsApplications';
import MetricIcon from '@material-ui/icons/Equalizer';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../util/TabPanel";
import a11yProps from "../util/a11yProps";
import Button from "@material-ui/core/Button/Button";
import './home.css';
import Cookie from "js-cookie";

import UsersList from "../users/UserList";
import RegisterPage from "../register/RegisterPage";
import PublicationsPage from "../publications/PublicationsPage";
import ServersPage from "../servers/ServersPage";
import MetricsPage from "../metrics/MetricsPage";
import Modal from "@material-ui/core/Modal";

Home.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};

export default function Home({expired, initialValue}) {

    const history = useHistory();
    const [value, setValue] = useState(initialValue);
    const [showCloseSessionConfirmationModal, setShowCloseSessionConfirmationModal] = useState(false);

    const closeCloseSessionConfirmationModal = () => {
        setShowCloseSessionConfirmationModal(false);
    };

    const closeSession = () => {
        setShowCloseSessionConfirmationModal(false);
        localStorage.removeItem("expirationDate");
        Cookie.remove('token');
        history.push("/login");
    };

    const sExpired = (expired !== undefined) ? expired : sessionExpired();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const openCloseSessionConfirmationModal = () => {
        setShowCloseSessionConfirmationModal(true);
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
                        <Tab label="Servidores" icon={<ServerIcon />} {...a11yProps(3)} />
                        <Tab label="Métricas" icon={<MetricIcon />} {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <RegisterPage />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UsersList />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <PublicationsPage />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ServersPage />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <MetricsPage />
                </TabPanel>
                <Button id="close-session-button" variant="contained" color="primary" onClick={openCloseSessionConfirmationModal}>Cerrar sesión</Button>
                <Modal
                    open={showCloseSessionConfirmationModal}
                    onClose={closeCloseSessionConfirmationModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    <div className="close-session-modal">
                        Estás seguro que deseas cerrar sesión?
                        <div className='confirmation-buttons'>
                            <Button className="no-button" variant="contained" onClick={closeCloseSessionConfirmationModal}>No</Button>
                            <Button className="yes-button" variant="contained" onClick={closeSession}>Sí</Button>
                        </div>
                    </div>
                </Modal>
            </div>
    );
}