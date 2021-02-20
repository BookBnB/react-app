import React, {useEffect, useState} from "react";
import './publicationInfo.css';
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import ReservationsList from "./reservations/ReservationsList";
import Cookie from "js-cookie";

export default function PublicationInfo({publication}) {

    const [showReservationsModal, setShowReservationsModal] = useState(false);
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

    const openReservationsModal = () => {
        setShowReservationsModal(true);
    };

    const closeReservationsModal = () => {
        setShowReservationsModal(false);
    };

    return (
        (!userInfo) ? null :
        <div className='publication-info'>
            <div className='title'>[{publication.estado}] - {publication.titulo}</div>
            <div className='host'>{userInfo.name} {userInfo.surname}</div>
            <div className='options'>
                <Link className='option-reservations' onClick={openReservationsModal}>Ver reservas asociadas</Link>
            </div>
            <Modal
                open={showReservationsModal}
                onClose={closeReservationsModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="publication-reservations-modal">
                    <ReservationsList publicationId={publication.id}/>
                </div>
            </Modal>
        </div>
    )
}