import React, {useEffect, useState} from "react";
import Cookie from "js-cookie";
import ReservationInfo from "./ReservationInfo";

export default function ReservationsList({publicationId}) {

    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        setReservations(getReservationsList());
    }, [setReservations]);

    function getReservationsList() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/publicaciones/' + publicationId + '/reservas', {
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
                setReservations(response);
            });

    }

    return (

        (!reservations) ? null :
            <div className='reservation-list'>
                {reservations.map(reservation => {
                    return (
                        <ReservationInfo reservation={reservation} />
                    )
                })}
            </div>
    );
}