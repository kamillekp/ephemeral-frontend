import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Card from '../../templates/CardLT'
import { useHistory } from 'react-router-dom';

export default function ResultLT () {
    const [profiles, setProfiles] = useState([]);

    const id = localStorage.getItem('Token');
    const history = useHistory();

    useEffect (()=> {  
        if(!id) {
            history.push('/error');
        }

        async function takeProfiles () {
            var estado = localStorage.getItem('estado');
            var cidade = localStorage.getItem('cidade');
            var bairro = localStorage.getItem('bairro');
            var response;  
            
            if(estado !== "" && cidade !== "" && bairro !== "") {
                response = await api.get(`user/ecb/lt?estado=${estado}&cidade=${cidade}&bairro=${bairro}&id=${id}`)
            }
            else if(estado !== "" && cidade !== "") {
                response = await api.get(`user/ec/lt?estado=${estado}&cidade=${cidade}&id=${id}`)
            }
            else if(estado !== "") {
                response = await api.get(`user/e/lt?estado=${estado}&id=${id}`)
            }
    
            setProfiles(response.data);
        }
        takeProfiles();
    }, []);

    return (
        <div>
            <Menu content={ContentHeaderLogado}/>

            <div className="results-container">
                <div className='textresultlt'>Esses são os lares temporários encontrados...</div>
                {profiles.length === 0 && (
                    <div className='greenBack'>
                        <div className='containerNoResults'>
                            NÃO HÁ LARES TEMPORÁRIOS <br/> NESSA REGIÃO
                        </div>
                    </div>
                )}
                {profiles.length !== 0 && (
                    <ul>
                        {profiles.map(profile =>
                            <Card profile={profile} key={profile.idUser}/>
                        )}
                    </ul>
                )}
            </div>

            <Rodape content={ContentRodape1}/>
            <Rodape2/>
        </div>
    );
}
