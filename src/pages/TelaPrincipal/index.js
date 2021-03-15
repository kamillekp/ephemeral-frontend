import React, {useEffect, useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import './style.css';

import Menu from '../../templates/Menu';
import ContentHomeAboutContact from '../../templates/ContentHomeAboutContact';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';

export default function Home() {
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');

    const [verificaToken, setToken] = useState(true);
    const id = localStorage.getItem('Token');
    const history = useHistory();

    useEffect (() => {
        if(!id) {
            setToken(false);
        }
    },   [])

    async function pesquisa(e) {
        e.preventDefault();

        try {
            localStorage.setItem('estado', estado);
            localStorage.setItem('cidade', cidade);
            localStorage.setItem('bairro', bairro);
            history.push('/resultLT');
        }
        catch (err) {
            alert('Erro na pesquisa. Tente novamente.')
        }
    };

    async function deslogar () {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div>
            {verificaToken === true && (
                <div>
                    <Menu content={ContentHomeAboutContact}/>
            
                    <div className="home-container">
                        <div className="img">
                            <div className="itensImg">
                                <p>Encontre um novo <br/> amigo para te ajudar <br/> nesse resgate animal</p>
                                <button className="loginButton" onClick={deslogar}>Logout</button>
                            </div>

                            <div className="formAlign">
                                <form method="post" onSubmit={pesquisa}>
                                    <input type="text" placeholder="UF (estado)" maxLength='2' required pattern='[A-Z]{2}' title='Apenas Letras maiúsculas'
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}></input>

                                    <input type="text" placeholder="CIDADE" maxLength='40'
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}></input>

                                    <input type="text" placeholder="BAIRRO" maxLength='40' 
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}></input>

                                    <button type="submit" value="submit" ><FiSearch size={50} className='iconButton'/></button>
                                </form>
                            </div>
                            
                            <div className="blankSpace">aaaaaaaaaaa</div>
                        </div>
                        <div className="imgPatas">
                            <div className="contentAbout">
                                    <p className="sobre" id="about">SOBRE</p><br/>
                                    <div className='linhas'>
                                        <hr className="linha"/> 
                                        <hr className="linha"/> 
                                    </div>

                                    <div className='arrumar'>
                                        <p className='prim'> O Ephemeral é uma plataforma desenvolvida através de um 
                                                            trabalho de conclusão realizado no Instituto Federal do  Rio 
                                                            Grande do Sul. 
                                                            
                                                            <br/><br/> 

                                                            Tem o intuito de auxiliar voluntários à lar temporário a 
                                                            acharem mais rapidamente um resgatador de animais, 
                                                            facilitando o processo de encontro entre ambos. </p>
                                    </div>
                            </div>
                        </div>
                        
                        <Rodape content={ContentRodape1}/>
                        <Rodape2/>
                    </div>  
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
                                    <p className='backLogin'><Link to='/' className='link'>Clique aqui para voltar para a tela de Login.</Link></p>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}