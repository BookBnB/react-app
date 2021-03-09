import React, {useState} from "react";
import './serverInfo.css';
import Link from "@material-ui/core/Link";
import Cookie from "js-cookie";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

export default function ServerInfo({server}) {

    const [showBlockServerConfirmationModal, setShowBlockServerConfirmationModal] =
        useState(false);

    const openBlockServerConfirmationModal = () => {
        setShowBlockServerConfirmationModal(true);
    };

    const closeBlockServerConfirmationModal = () => {
        setShowBlockServerConfirmationModal(false);
    };

    //TODO: modificar endpoint cuando este
    function handleServerBlock(blocked) {
        let serverBlockedBody = {bloqueado: blocked}

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/servidores/' + server.id + '/bloqueo', {
            method: 'PUT',
            body: JSON.stringify(serverBlockedBody),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Cookie.get("token")
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                if (response.message) {
                    alert(response.message)
                } else {
                    blockServerSuccess(blocked);
                }
            });
    }

    function blockServerSuccess(blocked) {
        let action = blocked ? "bloqueó" : "desbloqueó";
        alert("Se " + action + " correctamente el servidor " + server.nombre);
        closeBlockServerConfirmationModal();
    }


    function blockServerLink() {
        return server.bloqueado === true ?
            <Link className='option-block-server' onClick={() => handleServerBlock(false)}>Desbloquear servidor</Link> :
            <Link className='option-block-server' onClick={openBlockServerConfirmationModal}>Bloquear servidor</Link>
    }

    return (
        <div className='server-info'>
            <div className='name'>{server.nombre}</div>
            <div className='type'>{server.tipo}</div>
            <div className='token'>{server.token}</div>
            {blockServerLink()}
            <Modal
                open={showBlockServerConfirmationModal}
                onClose={closeBlockServerConfirmationModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="block-server-modal">
                    Estás seguro que deseas bloquear el servidor seleccionado?
                    <div className='confirmation-buttons'>
                        <Button className="no-button" variant="contained" onClick={closeBlockServerConfirmationModal}>No</Button>
                        <Button className="yes-button" variant="contained" onClick={() => handleServerBlock(true)}>Sí</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )

}