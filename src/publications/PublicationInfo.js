import React, {useEffect, useState} from "react";
import './publicationInfo.css';
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import ReservationsList from "./reservations/ReservationsList";
import Cookie from "js-cookie";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

export default function PublicationInfo({publication}) {

    const [showReservationsModal, setShowReservationsModal] = useState(false);
    const [showBlockPublicationConfirmationModal, setShowBlockPublicationConfirmationModal] =
        useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        setUserInfo(getUserInfoFromId());
    }, [setUserInfo]);

    function getUserInfoFromId() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/usuarios/' + publication.anfitrion.id, {
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
                setUserInfo(response);
            });

    }

    function handlePublicationBlock(blocked) {
        let publicationBlockedBody = {bloqueada: blocked}

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/publicaciones/' + publication.id + '/bloqueo', {
            method: 'PUT',
            body: JSON.stringify(publicationBlockedBody),
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
                    blockPublicationError(response.message)
                } else {
                    blockPublicationSuccess(blocked);
                }
            });
    }

    function blockPublicationError(message) {
        alert(message);
    }

    function blockPublicationSuccess(blocked) {
        let action = blocked ? "bloqueó" : "desbloqueó";
        alert("Se " + action + " correctamente la publicación " + publication.titulo);
        closeBlockPublicationConfirmationModal();
    }

    const openReservationsModal = () => {
        setShowReservationsModal(true);
    };

    const openBlockPublicationConfirmationModal = () => {
        setShowBlockPublicationConfirmationModal(true);
    };

    const closeReservationsModal = () => {
        setShowReservationsModal(false);
    };

    const closeBlockPublicationConfirmationModal = () => {
        setShowBlockPublicationConfirmationModal(false);
    };

    function blockPublicationLink() {
        return publication.bloqueada === true ?
            <Link className='option-block' onClick={() => handlePublicationBlock(false)}>Desbloquear publicación</Link> :
            <Link className='option-block' onClick={openBlockPublicationConfirmationModal}>Bloquear publicación</Link>
    }

    return (
        (!userInfo) ? null :
        <div className='publication-info'>
            <div className='title'>[{publication.estado}] - {publication.titulo}</div>
            <div className='host'>{userInfo.name} {userInfo.surname}</div>
            <div className='options'>
                <Link className='option-reservations' onClick={openReservationsModal}>Ver reservas asociadas</Link>
                {blockPublicationLink()}
            </div>
            <Dialog
                open={showReservationsModal}
                onClose={closeReservationsModal}
                scroll='body'
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="publication-reservations-modal">
                    <ReservationsList publicationId={publication.id}/>
                </div>
            </Dialog>
            <Modal
                open={showBlockPublicationConfirmationModal}
                onClose={closeBlockPublicationConfirmationModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="block-publication-modal">
                    Estás seguro que deseas bloquear la publicación seleccionada?
                    <div className='confirmation-buttons'>
                        <Button className="block-publication-no-button" variant="contained" onClick={closeBlockPublicationConfirmationModal}>No</Button>
                        <Button className="block-publication-yes-button" variant="contained" onClick={() => handlePublicationBlock(true)}>Sí</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}