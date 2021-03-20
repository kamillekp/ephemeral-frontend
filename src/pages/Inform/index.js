import './style.css';
import React, { useEffect, useState } from 'react';
import api from '../../Services/api';

import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import dog from '../../assets/doguinho.jpeg';

export default function Claims () {
    const [texto, setTexto] = useState('');
    const [email, setEmail] = useState('');
    const [verifica, setVerifica] = useState(true);
    const id = localStorage.getItem('Token');

    useEffect(() => {
        async function teste () {
            if(!id) {
                setVerifica(false);
            }
        }
    }, [])

    async function reclamar () {
        try {
            const data = {
                email, 
                texto
            }

            const response = await api.post('reclameAqui', data);
            alert(response.data);
        }
        catch(error) {
            alert('Não foi possível registrar a reclamação. Tente novamente.')
        }
    }

    return (
        <div>
            <Menu content={ContentHeaderLogado}/>
            {verifica === true && (
                <div>
                    <div className="login-container">
                        <div className="img_Container">
                        <img src={dog} alt="Gato"/>
                        </div>
                        <div className="formLogin">
                            <p className="textinho">Faça sua reclamação aqui!</p>
                            <p className="informeAAA">Informe os dados solicitados abaixo</p>
                            
                            <form onSubmit={reclamar}>
                                <input type="email" placeholder="email@gmail.com" required className='diferentao'
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                                
                                <br/>

                                <textarea type="text" placeholder="Escreva o seu comentário aqui" maxLength='300' required className='textareaReclame'
                                value={texto}
                                onChange={e => setTexto(e.target.value)}/> 
                                
                                <br/>
    
                                <button type="submit" value="submit" className="buttonAAA">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}


            {verifica === false && (
                <div>
                    <Menu content={ContentHomeHelp}/>

                    <div className='error-container'>
                        <div className="quadradoAlert"> 
                            <p className='exclamacao'> ! <br/> 
                                <p className='errorContainer'> ERROR <br/> 
                                    <p className='textContainer'> Você não tem permissão para acessar a página.</p>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            )}
                        
        </div>
    );
}