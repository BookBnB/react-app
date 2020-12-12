import React from "react";
import './userInfo.css';
import Link from "@material-ui/core/Link";

export default function UserInfo({user}) {

    function mapRole(role) {
        const roles = [['guest', 'Usuario'], ['host', 'Anfitrión'], ['admin', 'Administrador']]
        let rolesMap = new Map(roles);

        return rolesMap.get(role);
    }

    return (
        <div className='user-info'>
            <div className='name'>{user.name} {user.surname}</div>
            <div className='role'>{mapRole(user.role)}</div>
            <div className='options'>
                <Link className='option-profile'>Ver perfil</Link>
                <Link className='option-block'>Bloquear usuario</Link>
                <Link className='option-money'>Cargar saldo</Link>
            </div>
        </div>
    )
}