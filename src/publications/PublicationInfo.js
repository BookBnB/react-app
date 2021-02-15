import React, {useState} from "react";
import './publicationInfo.css';

export default function PublicationInfo({publication}) {

    return (
        <div className='publication-info'>
            <div className='title'>{publication.titulo}</div>
            <div className='host'>{publication.anfitrion.id}</div>
        </div>
    )
}