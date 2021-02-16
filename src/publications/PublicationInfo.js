import React, {useState} from "react";
import './publicationInfo.css';
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import ReservationsList from "./ReservationsList";

export default function PublicationInfo({publication}) {

    const [showReservationsModal, setShowReservationsModal] = useState(false);

    const openReservationsModal = () => {
        setShowReservationsModal(true);
    };

    const closeReservationsModal = () => {
        setShowReservationsModal(false);
    };

    return (
        <div className='publication-info'>
            <div className='title'>{publication.titulo}</div>
            <div className='host'>{publication.anfitrion.id}</div>
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