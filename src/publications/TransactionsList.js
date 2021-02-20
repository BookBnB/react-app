import React, {useEffect, useState} from "react";
import Cookie from "js-cookie";
import TransactionInfo from "./TransactionInfo";

export default function TransactionsList({reservationId}) {

    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        setTransactions(getTransactionsList());
    }, [setTransactions]);

    function getTransactionsList() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/reservas/' + reservationId + '/transacciones', {
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
                setTransactions(response);
            });

    }

    return (

        (!transactions) ? null :
            (transactions.length === 0) ?
                <div className="no-transactions-message">
                    No se encontraron transacciones para la reserva seleccionada
                </div> :
                <div className='transaction-list'>
                    {transactions.map(transaction => {
                        return (
                            <TransactionInfo transaction={transaction} />
                        )
                    })}
                </div>
    );
}