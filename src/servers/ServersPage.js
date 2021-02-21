import React, {useEffect, useState} from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";
import Cookie from "js-cookie";
import ServerInfo from "./ServerInfo";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import './serverInfo.css';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";

export default function ServersPage({expired}) {

    const [servers, setServers] = useState(null);
    const [showAddServerModal, setShowAddServerModal] = useState(false);
    const [serverType, setServerType] = useState('');
    const [serverName, setServerName] = useState('');

    const sExpired = !expired ? expired : sessionExpired()

    useEffect(() => {
        setServers(getServersList());
    }, [setServers]);

    const handleTypeChange = (event) => {
        setServerType(event.target.value);
    };

    const handleNameChange = (event) => {
        setServerName(event.target.value);
    };

    function getServersList() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/servidores', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Cookie.get("token")
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                setServers(response);
            });

    }

    const openAddServerModal = () => {
        setShowAddServerModal(true);
    };

    const closeAddServerModal = () => {
        setShowAddServerModal(false);
    };

    return (

        (sExpired) ?
            <Redirect to="/login" /> :
            (!servers) ? null :
                <div className='servers-list'>
                    <div className='add-server'>
                        <Link className='add-server-link' onClick={openAddServerModal}>Agregar nuevo servidor</Link>
                    </div>
                    {servers.map(server => {
                        return (
                            <ServerInfo server={server} />
                        )
                    })}
                    <Modal
                        open={showAddServerModal}
                        onClose={closeAddServerModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        <div className="add-server-modal">
                            <div className='add-server-modal-title'>Agregar nuevo servidor</div>
                            <div className="add-server-inputs">
                                <FormControl className='new-server-type'>
                                    <InputLabel id="new-server-type-label">Tipo</InputLabel>
                                    <Select
                                        labelId="new-server-type-label"
                                        id="new-server-type"
                                        value={serverType}
                                        onChange={handleTypeChange}>
                                        <MenuItem value={0}>Pagos</MenuItem>
                                        <MenuItem value={1}>Usuarios</MenuItem>
                                    </Select>
                                </FormControl>
                                <div className="new-server-name">
                                    <TextField required id="name" label="Nombre" variant="outlined"
                                               onChange={handleNameChange} />
                                </div>
                            </div>
                            <Button className="accept-button" variant="contained" onClick={closeAddServerModal}>Agregar servidor</Button>
                        </div>
                    </Modal>
                </div>
    );
}