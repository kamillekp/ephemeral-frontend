import React, {useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiLayout, FiLogOut } from "react-icons/fi";
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import catProfile from '../../assets/catProfile.jpeg';
import ContentHomeHelp from '../../templates/ContentHomeHelp';


export default function  MyProfile () {
    const [profile, setProfile] = useState('');
    const [coment, setComent] = useState([]);
    const [imagem, setImagem] = useState('')

    const [verificaToken, setToken] = useState(true);
    const id = localStorage.getItem('Token');
    const history = useHistory();
    
    useEffect (() => {
        if(!id) {
            setToken(false);
        }
        
        async function takeOwnProfile() {
            const response = await api.get(`user/${id}`);
            setProfile(response.data);
            console.log(response.data)            
        }
        async function takeComent () {
           const response = await api.get(`coment/search/destinatario/${id}`);
           console.log(response.data);
           setComent(response.data);
        }
        async function takeImageProfile () {
            const response = await api.get(`user/ownImagens/${id}`);
            console.log(response.data);
            setImagem(response.data);
        }
        takeOwnProfile();
        takeComent();
        takeImageProfile();
    },  [id]);

    async function deleteProfile () {
        try {
            if(window.confirm('Certeza que deseja deletar seu perfil?')) {
                await api.delete(`user/settings/delete/${id}`);
                localStorage.clear();
                history.push('/');
            }
        }
        catch (err) {
            alert('Erro ao deletar o perfil');
        }
    };

    async function deslogar () {
        localStorage.clear();
        history.push('/');
    };

    return (
        <div>
            {verificaToken === true && (
                <div>
                    <Menu content={ContentHeaderLogado}/>

                    <div className="perfil-container">    
                        <div className="infos-container">
                            <div className="about">
                                <h5>Sobre</h5>
                                <p>Moradia: {profile.complemento}</p>
                                <p>{profile.estado} - {profile.cidade}</p>
                                <p>Lar temporário {profile.atividade}</p>
                            </div>

                            {profile.atividade === 'Ativo' && (
                                <div className="preferencias">
                                    <h5>Preferências</h5>
                                    <p>- {profile.opcaoTipoAnimal}</p>
                                    <p>- {profile.opcaoSexo}</p>
                                    {profile.opcaoAnimalEspecial !== 'Não' && (<p>- {profile.opcaoAnimalEspecial}</p>)}
                                    {profile.ajudaEmergencia !== 'Não' && (<p>- {profile.ajudaEmergencia}</p>)}
                                    {profile.dividirDespesas !== 'Não' && (<p>- {profile.dividirDespesas}</p>)}
                                </div>
                            )}  
                        </div>

                        <div className="centerProfile">
                            <img src={imagem.url} className='imgfake'></img>
                            <p>{profile.nome}</p>
                            <p>{profile.nomeUser}</p>
                        </div>

                        <div className="button-container">
                            <Link to='/settings'><button className="wBack1">Editar o perfil</button></Link>
                            <button className="wBack" onClick={deleteProfile}>Excluir perfil</button>
                            <button className="wBack" onClick={deslogar}>Logout</button>
                            <Link to='/Myprocesses'><button className="noBack1">Meus processos</button></Link>
                        </div>
                    </div>


                        {coment.length !== 0 && (
                            <div className="coments-container">
                                <ul className="coments">
                                    {coment.map(coments =>
                                        <li key={coments.idComentario}>
                                            <p>{coments.userNameRemetente}</p>
                                            <p className='mensagem'>{coments.texto}</p>
                                            <div>
                                                <p className='dataC'>{coments.dataComent}</p>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                                <img src={catProfile} alt="Cat"/>
                            </div>
                        )}
                        {coment.length === 0 && (
                            <div className="coments-container">
                                <div className="noComents">
                                    <h1>Não há comentários <br/> disponíveis.</h1>
                                </div>
                                <img src={catProfile} alt="Cat"/>
                            </div>
                        )}


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
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
    
}