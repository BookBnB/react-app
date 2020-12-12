import React, {useState} from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import * as PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../util/TabPanel";
import a11yProps from "../util/a11yProps";
import UserList from "./UserList";

UsersPage.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function UsersPage() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //En la lista de usuarios, al hacer click en uno en particular se deberia ver su perfil
    //En la pantalla del perfil deberia haber un boton para bloquear al usuario y otro para cargar saldo en su billetera
    return (
        (sessionExpired()) ?
            <Redirect to="/login" /> :
            <div className='users-page'>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on">
                        <Tab label="Listar usuarios" {...a11yProps(0)} />
                        <Tab label="Listar transacciones" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <UserList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Listar transacciones
                </TabPanel>
            </div>
    );
}