import React from "react";

export default function TransactionInfo({transaction}) {

    return (
        <div className='transaction-info'>
            <div className='event'>[{transaction.evento}] - {transaction.emisor}</div>
            <div className='wallet'>Billetera: {transaction.billetera}</div>
            <div className='value'>Valor: {transaction.valor}</div>
            <div className='fees'>Fees: {transaction.fees}</div>
        </div>
    )

}