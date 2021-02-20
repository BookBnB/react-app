import Link from "@material-ui/core/Link";
import React, {useEffect, useState} from "react";
import TransactionsList from "../transactions/TransactionsList";
import Modal from "@material-ui/core/Modal";
import '../publicationInfo.css';

export default function ReservationInfo({reservation}) {

    const [showTransactionsModal, setShowTransactionsModal] = useState(false);

    const openTransactionsModal = () => {
        setShowTransactionsModal(true);
    };

    const closeTransactionsModal = () => {
        setShowTransactionsModal(false);
    };

    return (
        <div className='reservation-info'>
            <div className='guest'>{reservation.huespedId}</div>
            <div className='period'>{reservation.fechaInicio} - {reservation.fechaFin}</div>
            <div className='options'>
                <Link className='option-transactions' onClick={openTransactionsModal}>Ver transacciones</Link>
            </div>
            <Modal
                open={showTransactionsModal}
                onClose={closeTransactionsModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                <div className="transactions-modal">
                    <TransactionsList reservationId={reservation.id}/>
                </div>
            </Modal>
        </div>
    )

}