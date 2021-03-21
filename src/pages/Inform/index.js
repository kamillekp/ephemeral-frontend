import './style.css';
import React, { useEffect, useState } from 'react';
import api from '../../Services/api';

import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
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
        teste();
    }, []);

    async function reclamar (e) {
        e.preventDefault()
        try {
            const response = await api.post('reclameAqui', {texto, email});
            alert(response.data);
        }
        catch(error) {
            alert('Não foi possível registrar a reclamação. Tente novamente.')
        }
    }

    return (
        <div>
            {verifica === true && (
                <div>
                    <Menu content={ContentHeaderLogado}/>
                    <div className="login-container">
                        <div className="img_Container">
                        <img src={dog} alt="Gato"/>
                        </div>
                        <div className="formLogin">
                            <p className="textinho">Faça sua reclamação aqui!</p>
                            <p className="informeAAA">Informe os dados solicitados abaixo</p>
                            
                            <form onSubmit={reclamar}>
                                <input type="email" placeholder="email@gmail.com" required className='diferentao' pattern='^[a-z0-9._]+@gmail.com$' title='prefixo@gmail.com // deve inciar com letra minúscula'
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                                
                                <br/>

                                <textarea type="text" placeholder="Escreva o seu comentário aqui" maxLength='300' required className='textareaReclame'
                                value={texto}
                                onChange={e => setTexto(e.target.value)}/> 
                                
                                <br/>
                                <button type="submit" value="submit" className="buttonAAA">Enviar</button>
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