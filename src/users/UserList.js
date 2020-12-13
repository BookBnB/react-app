import React, {useEffect, useState} from "react";
import sessionExpired from "../util/sessionExpired";
import {Redirect} from "react-router-dom";
import Cookie from "js-cookie";
import UserInfo from "./UserInfo";

export default function UserList({expired}) {

    const [users, setUsers] = useState(null);

    const sExpired = !expired ? expired : sessionExpired()

    useEffect(() => {
        setUsers(getUserList());
    }, [setUsers]);

    function getUserList() {

        fetch(process.env.REACT_APP_BACKEND_URL + '/v1/usuarios', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': Cookie.get("token")
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error('Error:', error))
            .then((response) => {
                setUsers(response);
            });

    }

    return (

        (sExpired) ?
            <Redirect to="/login" /> :
            (!users) ? null :
            <div className='user-list'>
                {users.map(user => {
                    return (
                        <UserInfo user={user} />
                    )
                })}
            </div>
    );
}