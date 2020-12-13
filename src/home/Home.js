import React, {useState} from "react";
import { Redirect } from 'react-router-dom';
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

Home.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any,
    value: PropTypes.any,
};

export default function Home({expired, initialValue}) {

    const [value, setValue] = useState(initialValue);

    const sExpired = !expired ? expired : sessionExpired();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        (sExpired) ?
            <Redirect to="/login" /> :
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
            </div>
    );
}