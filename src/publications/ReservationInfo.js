import Link from "@material-ui/core/Link";
import React from "react";

export default function ReservationInfo({reservation}) {

    return (
        <div className='reservation-info'>
            <div className='guest'>{reservation.huespedId}</div>
            <div className='period'>{reservation.fechaInicio} - {reservation.fechaFin}</div>
            <div className='options'>
                <Link className='option-transactions'>Ver transacciones</Link>
            </div>
        </div>
    )

}