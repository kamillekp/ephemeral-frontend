import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import api from '../../Services/api';       

export default function Card ({profile}) {
    const [imagem, setImagem] = useState('');
    const history = useHistory();
    
    function pushProfileLT () {
        history.push(`ltProfile/${profile.idUser}`)    
    }

    useEffect(() =>{
        async function takeImagem() {
            const response = await api.get(`lt/ownImagens/${profile.idUser}`);
            console.log(response.data)
            setImagem(response.data);
        }
        takeImagem();
    },  [])

    return (
        <Link onClick={pushProfileLT} className='link'>
            <li key={profile.idUser}>
                <img src={imagem.url}className='imgSearch'></img>
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