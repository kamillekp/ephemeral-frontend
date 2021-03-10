import React from 'react';
import { useHistory, Link } from "react-router-dom";
                
export default function Card ({profile}) {
    console.log(profile)
    const history = useHistory();

    function pushProfileLT () {
        history.push(`ltProfile/${profile.idUser}`)    
    }

    return (
        <Link onClick={pushProfileLT} className='link'>
            <li key={profile.idUser}>
                <div className='imgSearch'></div>
                <p>{profile.nome}</p>
                <div className="tri">
                    <p>{profile.estado}</p>
                    <p>{profile.cidade}</p>
                    <p>{profile.atividade}</p>
                </div>
            </li>
        </Link>
    );
}