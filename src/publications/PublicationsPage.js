import React, {useEffect, useState} from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";
import Cookie from "js-cookie";
import PublicationInfo from "./PublicationInfo";

export default function PublicationsPage({expired}) {

    const [publications, setPublications] = useState(null);

    const sExpired = !expired ? expired : sessionExpired();
    
    useEffect(() => {
        setPublications(getPublicationsList());
    }, [setPublications]);

    function getPublicationsList() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/publicaciones?coordenadas%5Blatitud%5D=0&coordenadas%5Blongitud%5D=0&radio=5000000000&incluirBloqueadas=true', {
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
                setPublications(response);
            });

    }

    return (

        (sExpired) ?
            <Redirect to="/login" /> :
            (!publications) ? null :
                <div className='publication-list'>
                    {publications.map(publication => {
                        return (
                            <PublicationInfo publication={publication} />
                        )
                    })}
                </div>
    );
}