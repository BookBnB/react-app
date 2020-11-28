import React, {useState} from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import * as PropTypes from "prop-types";
import AddUserIcon from '@material-ui/icons/PersonAdd';
import UserIcon from '@material-ui/icons/Person';
import PublicationIcon from '@material-ui/icons/FilterNone';
import ServiceIcon from '@material-ui/icons/SettingsApplications';
import MetricIcon from '@material-ui/icons/Equalizer';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

Home.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

export default function Home() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        (sessionExpired()) ?
            <Redirect to="/login" /> :
            <div className='home'>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example">
                        <Tab label="Registro administradores" icon={<AddUserIcon />} {...a11yProps(0)} />
                        <Tab label="Usuarios" icon={<UserIcon />} {...a11yProps(1)} />
                        <Tab label="Publicaciones" icon={<PublicationIcon />} {...a11yProps(2)} />
                        <Tab label="Servicios" icon={<ServiceIcon />} {...a11yProps(3)} />
                        <Tab label="Métricas" icon={<MetricIcon />} {...a11yProps(4)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    Registro administradores
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Usuarios
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