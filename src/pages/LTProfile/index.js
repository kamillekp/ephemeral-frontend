import React, {useEffect, useState} from 'react';
import { useParams, Link } from "react-router-dom";
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import Rodape2 from '../../templates/Rodape2';
import catProfileLT from '../../assets/catProfileLT.jpeg';

export default function LTProfile () {
    const [profileLT, setProfile] = useState('');
    const [texto, setText] = useState('');
    const [coment, setComent] = useState([]);
    const [tel, setTel] = useState('');

    const [verificaToken, setVerToken] = useState(true);

    const id = localStorage.getItem('Token');
    let {idUser} = useParams()
    
    useEffect (() => {
        if(!id) {
            setVerToken(false);
        }
        async function takeProfileLT() { 
            const responseLT = await api.get(`lt/${idUser}`);
            setTel('55' + responseLT.data.ddd + responseLT.data.numeroTel);
            setProfile(responseLT.data);
        }
        async function takeComents () {
            const response = await api.get(`coment/search/destinatariolt/${idUser}`);
            setComent(response.data);
        }
        takeProfileLT();
        takeComents();
    },  []);

    async function openProcess () {
        try {
            if(window.confirm('Deseja mesmo registrar um processo com esse lt?')) {
                await api.post(`process/${id}/${idUser}`);
                alert('Processo registrado.');
            }
        }
        catch (err) {
            alert('Erro ao realizar registro. Tente novamente.')
        }
    };

    async function comment () {
        try {
            console.log(idUser, id, texto);
            if(window.confirm(`Deseja mesmo enviar essa avaliação para o perfil de ${profileLT.nome}?`)) {
                await api.post(`coment/${id}/user/${idUser}`, {texto});
                alert('Comentário realizado.');
            }
        }
        catch (err) {
            alert('Erro ao realizar comentário. Tente novamente.')
        }
    };

    return (
        <div>
            {verificaToken === true && (
                <div>
                    <Menu content={ContentHeaderLogado}/>

                    <div className="perfil-container" id="maisMargin">    
                        <div className="infos-container">
                            <div className="about">
                                {console.log(coment)}
                                <h5>Sobre</h5>
                                <p>Moradia: {profileLT.complemento}</p>
                                <p>{profileLT.estado} - {profileLT.cidade}</p>
                                <p>Lar temporário {profileLT.atividade}</p>
                            </div>
                            <div className="preferencias">
                                <h5>Preferências</h5>
                                <p>- {profileLT.opcaoTipoAnimal}</p>
                                <p>- {profileLT.opcaoSexo}</p>
                                {profileLT.opcaoAnimalEspecial !== 'Não' && (<p>- {profileLT.opcaoAnimalEspecial}</p>)}
                                {profileLT.ajudaEmergencia !== 'Não' && (<p>- {profileLT.ajudaEmergencia}</p>)}
                                {profileLT.dividirDespesas !== 'Não' && (<p>- {profileLT.dividirDespesas}</p>)}
                            </div>
                        </div>

                        <div className="centerProfile">
                            <div className='imgfake'></div>
                            <p>{profileLT.nome}</p>
                            <p>{profileLT.nomeUser}</p>
                        </div>

                        <div className="buttonContainer">
                            <a href= {`https://wa.me/${tel}`} target='_blank'><button className="wBack" id='whatsApp'>WhatsApp</button></a>
                            <div>
                                <button onClick={openProcess} className="wBack">Registrar processo</button>
                            </div>
                            <div>
                                <form onSubmit={comment}>
                                    <textarea required type="text" placeholder="Deixe sua avaliação" className="inputMsg" maxLength='300'
                                    value={texto}
                                    onChange={e => setText(e.target.value)}/>
                                    
                                    <br/>
                        
                                    <button type="submit" value="submit" className="buttonEnvia">Enviar</button>
                                </form>
                            </div>                
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
                                <img src={catProfileLT} alt="Cat"/>
                            </div>
                        )}
                        {coment.length === 0 && (
                            <div className="coments-container">
                                <div className="noComents">
                                    <h1>Não há comentários <br/> disponíveis.</h1>
                                </div>
                                <img src={catProfileLT} alt="Cat"/>
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