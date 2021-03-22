import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import dog from '../../assets/dogSenha.jpeg';

export default function NewPassword () {
    const [verifica, setVerifica] = useState(true);
    const [email, setEmail] = useState('');
    
    const history = useHistory();
    const id = localStorage.getItem('Token');

    async function handlePassword (e) {
        e.preventDefault();
        try {
            await api.put('user/alterarSenha', {email});
            alert(`Acesse ao endereço de email ${email}`);
            history.push('/');
        }
        catch (err) {
            alert ('Erro ao recuperar a senha. Tente novamente.');
        }
    };

    useEffect(() =>{
        function teste () {
            if(id) {
                setVerifica(false);
            }
        }
        teste();
    }, []);

    return (
        <div>
            {verifica === true && (
                <div>
                    <Menu content={ContentHomeHelp}/>
                    <div className="login-container">
                        <div className="img_Container">
                        <img src={dog} alt="Gato"/>
                        </div>
                        <div className="formLogin">
                            <p className="textinho" id='textinho'>Recupere a sua senha!</p>
                            <p className="informeAAA">Informe o seu endereço de email.</p>
                            
                            <form onSubmit={handlePassword}>
                                <input type="email" placeholder="email@gmail.com" required className='diferentao' id='diferentao' pattern='^[a-z0-9._]+@gmail.com$' title='prefixo@gmail.com // deve inciar com letra minúscula'
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                                {console.log(email)}
                                <br/>

                                <button type="submit" value="submit" className="buttonAAA">Enviar</button>
                                <Link to ="/" className="link"><p className="cadastre" id='doidjo'>Voltar para tela de login</p></Link>
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