import React, {useState} from "react";
import './userInfo.css';
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Cookie from "js-cookie";
import {func} from "prop-types";

export default function UserInfo({user}) {

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showBlockUserConfirmationModal, setShowBlockUserConfirmationModal] = useState(false);
    const [showChargeModal, setShowChargeModal] = useState(false);
    const [userWallet, setUserWallet] = useState(null);

    function blockUser() {
        let userBlockedBody = {blocked: true}

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/usuarios/' + user.id + '/bloqueo', {
            method: 'PUT',
            body: JSON.stringify(userBlockedBody),
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
                    blockUserError(response.message)
                } else {
                    blockUserSuccess();
                }
            });
    }

    function blockUserError(message) {
        alert(message);
    }

    function blockUserSuccess() {
        alert("Se bloqueó correctamente al usuario " + user.name + " " + user.surname);
        closeBlockUserConfirmationModal();
    }

    function getUserWallet() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/billeteras/' + user.id, {
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
                setUserWallet(response);
            });

    }

    const openProfileModal = () => {
      setShowProfileModal(true);
    };

    const openBlockUserConfirmationModal = () => {
        setShowBlockUserConfirmationModal(true);
    };

    const openChargeModal = () => {
        if (!userWallet) {
            getUserWallet();
        }
        setShowChargeModal(true);
    };

    const closeProfileModal = () => {
        setShowProfileModal(false);
    };

    const closeBlockUserConfirmationModal = () => {
        setShowBlockUserConfirmationModal(false);
    };

    const closeChargeModal = () => {
        setShowChargeModal(false);
    };

    function mapRole(role) {
        const roles = [['guest', 'Huésped'], ['host', 'Anfitrión'], ['admin', 'Administrador']]
        let rolesMap = new Map(roles);

        return rolesMap.get(role);
    }

    return (
        <div className='user-info'>
            <div className='name'>{user.name} {user.surname}</div>
            <div className='role'>{mapRole(user.role)}</div>
            <div className='options'>
                <Link className='option-profile' onClick={openProfileModal}>Ver perfil</Link>
                <Link className='option-block' onClick={openBlockUserConfirmationModal}>Bloquear usuario</Link>
                <Link className='option-money' onClick={openChargeModal}>Cargar saldo</Link>
            </div>
            <Modal
                open={showProfileModal}
                onClose={closeProfileModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="user-profile-modal">
                    <div className="user-name-modal">
                        {user.name} {user.surname}
                    </div>
                    <div className="user-role-modal">
                        {mapRole(user.role)}
                    </div>
                    <div className="user-contact-data-modal">
                        <p>Datos de contacto</p>
                        <div className="user-email-modal">
                            Mail: {user.email}
                        </div>
                        {user.city ?
                            <div className="user-city-modal">
                                Ciudad: {user.city}
                            </div> : null }
                        {user.phone ?
                        <div className="user-phone-modal">
                            Teléfono: {user.phone}
                        </div> : null}
                    </div>
                </div>
            </Modal>
            <Modal
                open={showBlockUserConfirmationModal}
                onClose={closeBlockUserConfirmationModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="block-user-modal">
                    Estás seguro que deseas bloquear al {mapRole(user.role)} {user.name} {user.surname}?
                    <div className='confirmation-buttons'>
                        <Button className="block-user-no-button" variant="contained" onClick={closeBlockUserConfirmationModal}>No</Button>
                        <Button className="block-user-yes-button" variant="contained" onClick={blockUser}>Sí</Button>
                    </div>
                </div>
            </Modal>
            <Modal
                open={showChargeModal}
                onClose={closeChargeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="charge-amount-modal">
                    La dirección de la billetera del usuario es:
                    <div className="user-wallet">
                        {userWallet ? userWallet.direccion : ""}
                    </div>
                </div>
            </Modal>
        </div>
    )
}