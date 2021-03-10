import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import api from '../../Services/api';
import './style.css';

import cat from '../../assets/loginCat.jpeg';
import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';

export default function Login () {
    const [nomeUser, setUserName] = useState('');
    const [senha, setSenha] = useState('');
    const [auth, setAuth] = useState('');

    const history = useHistory();
    const token = localStorage.getItem('Token');

    useEffect(() => {
        if(token) {
            history.push('/home');
        }
    }, [])

    async function logar (e) {
        e.preventDefault();

        const data = {
            nomeUser,
            senha
        }

        try {
            const response = await api.post('login', data);
            setAuth(true);
            localStorage.setItem('Token', response.data.token);
            localStorage.setItem('Atividade', response.data.atividade);
            history.push('/home');
        }
        catch (err) {
            setAuth(false)
        }
    }

    return (
        <div>
            <Menu content={ContentHomeHelp}/>

            <div className="login-container">
                <div className="imgContainer">
                <img src={cat} alt="Gato"/>
                </div>
                <div className="formLogin">
                    <p className="bemVindo">Bem-vindo(a)!</p>
                    <p className="informe">Informe os dados solicitados abaixo</p>
                    
                    <form onSubmit={logar}>
                        <input type="text" placeholder="@username" maxLength='10' required 
                        value={nomeUser}
                        onChange={e => setUserName(e.target.value)}/><br/>

                        <input type="password" placeholder="Senha" maxLength='8' required 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}/> <br/>

                        {auth === false && (
                            <div className='avisoLog'>
                                 Nome de usuário e/ou senha inválidos.
                            </div>
                        )}
                    
                        <button type="submit" value="submit" className="enterButton">Entrar</button>
                        <Link to ="/register" className="link"><p className="cadastre">Não tem uma conta? cadastre-se</p></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

