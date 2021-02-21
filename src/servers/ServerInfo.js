import React from "react";
import './serverInfo.css';

export default function ServerInfo({server}) {

    return (
        <div className='server-info'>
            <div className='name'>{server.nombre}</div>
            <div className='type'>{server.tipo}</div>
            <div className='token'>{server.token}</div>
        </div>
    )

}