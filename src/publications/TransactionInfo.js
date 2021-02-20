import React, {useEffect, useState} from "react";
import Cookie from "js-cookie";

export default function TransactionInfo({transaction}) {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        setUserInfo(getUserInfoFromId());
    }, [setUserInfo]);

    function getUserInfoFromId() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/usuarios/' + transaction.emisor.usuarioId, {
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

    function mapSuccess() {
        const success = [[true, 'Transferencia exitosa'], [false, 'Transferencia no exitosa']]
        let successMap = new Map(success);
        return successMap.get(transaction.exito);
    }

    return (
        (!userInfo) ? null :
            <div className='transaction-info'>
                <div className='event'>[{transaction.evento}] - {userInfo.name} {userInfo.surname}</div>
                <div className='wallet'>Billetera: {transaction.emisor.direccion}</div>
                <div className='date'>Fecha: {transaction.fecha}</div>
                <div className='reservation-id'>ID de la reserva: {transaction.reservaId}</div>
                <div className='success'>{mapSuccess()}</div>
            </div>
    )

}