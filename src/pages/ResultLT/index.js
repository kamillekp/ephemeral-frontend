import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import Card from '../../templates/CardLT'

export default function ResultLT () {
    const [profiles, setProfiles] = useState([]);

    const [verificaToken, setToken] = useState(true);
    const id = localStorage.getItem('Token');

    useEffect (()=> {  
        if(!id) {
            setToken(false);
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
            {verificaToken === true && (
                <div>
                    <Menu content={ContentHeaderLogado}/>

                    <div className="results-container">
                        {profiles.length === 0 && (
                            <div className='greenBack'>
                                <div className='containerNoResults'>
                                    NÃO HÁ LARES TEMPORÁRIOS <br/> NESSA REGIÃO
                                </div>
                            </div>
                        )}
                        {profiles.length !== 0 && (
                            <div>
                                <div className='textresultlt'>Esses são os lares temporários encontrados...</div> 
                                <ul>
                                    {profiles.map(profile =>
                                        <Card profile={profile} key={profile.idUser}/>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>

                    <Rodape content={ContentRodape1}/>
                    <Rodape2/>
                </div>
            )}



            {verificaToken === false && (
                <div>
                    <Menu content={ContentHomeHelp}/>

                    <div className='error-container'>
                        <div className="quadradoAlert"> 
                            <p className='exclamacao'> ! <br/> 
                                <p className='errorContainer'> ERROR <br/> 
                                    <p className='textContainer'> Você não tem permissão para acessar a página.</p>
                                    <p className='backLogin'><Link to='/'>Clique aqui para voltar para a tela de Login.</Link></p>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}
