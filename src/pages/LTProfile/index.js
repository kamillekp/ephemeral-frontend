import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import catProfileLT from '../../assets/catProfileLT.jpeg';

export default function LTProfile () {
    const [profileLT, setProfile] = useState('');
    const [texto, setText] = useState('');
    const [coment, setComent] = useState([]);
    const [tel, setTel] = useState('');

    const [verificaProc, setVerificaProc] = useState('');
    const [verificaComent, setVerificaComent] = useState('');

    const history = useHistory();
    const id = localStorage.getItem('Token');
    let {idUser} = useParams()
    
    useEffect (() => {
        if(!id) {
            history.push('/error');
        }
        async function takeProfileLT() { 
            const responseLT = await api.get(`lt/${idUser}`);
            setTel('55' + responseLT.data.ddd + responseLT.data.numeroTel);
            setProfile(responseLT.data);
        }
        async function takeComents () {
            const response = await api.get(`coment/search/destinatariolt/${idUser}`);
            console.log(response.data);
            setComent(response.data);
        }
        takeProfileLT();
        takeComents();
    },  [idUser]);

    async function openProcess (e) {
        e.preventDefault();
        try {
            if(window.confirm('Deseja mesmo registrar um processo com esse lt?')) {
                api.post(`process/${id}/${idUser}`);
                setVerificaProc(true);
            }
        }
        catch (err) {
            setVerificaProc(false);
        }
    };

    async function comment (e) {
        e.preventDefault();
        try {
            console.log(id + '    ' + idUser + '     ' + texto);
            await api.post(`coment/${id}/user/${idUser}`, {texto});
            setVerificaComent(true);
        }
        catch (err) {
            setVerificaComent(false);
        }
    };

    return (
        <div>
            <Menu content={ContentHeaderLogado}/>

            <div className="perfil-container" id="maisMargin">    
                <div className="infos-container">
                    <div className="about">
                        <h5>Sobre</h5>
                        <p>Moradia: {profileLT.complemento}</p>
                        <p>{profileLT.estado} - {profileLT.cidade}</p>
                        <p>Lar temporário {profileLT.atividade}</p>
                    </div>
                    <div className="preferencias">
                        <h5>Preferências</h5>
                        <p>{profileLT.opcaoTipoAnimal}</p>
                        <p>{profileLT.opcaoSexo}</p>
                        {profileLT.opcaoAnimalEspecial !== 'Não' && (<p>{profileLT.opcaoAnimalEspecial}</p>)}
                        {profileLT.ajudaEmergencia !== 'Não' && (<p>{profileLT.ajudaEmergencia}</p>)}
                        {profileLT.dividirDespesas !== 'Não' && (<p>{profileLT.dividirDespesas}</p>)}
                    </div>
                </div>

                <div className="centerProfile">
                    <div className='imgfake'></div>
                    <p>{profileLT.nome}</p>
                    <p>{profileLT.nomeUser}</p>
                </div>

                <div className="buttonContainer">
                    <a href= {`https://wa.me/${tel}`}><button className="wBack">WathsApp</button></a>
                    <div>
                        <button onClick={openProcess} className="wBack">Registrar processo</button>
                        {verificaProc === true && (
                            <div className='reg'>
                                Registro concluído.
                            </div>
                        )}
                        {verificaProc === false && (
                            <div className='reg'>
                                Tente novamente.
                            </div>
                        )}
                    </div>
                    <div>
                        <form onSubmit={comment}>
                            <textarea required type="text" placeholder="Deixei sua avaliação" className="inputMsg" maxLength='300'
                            value={texto}
                            onChange={e => setText(e.target.value)}/><br/>
                
                            <button type="submit" value="submit" className="buttonEnvia">Enviar</button>
                        </form>
                        {verificaComent === true && (
                            <div className='reg'>
                                Comentário realizado.
                            </div>
                        )}
                        {verificaComent === false && (
                            <div className='reg'>
                                Tente novamente.
                            </div>
                        )}
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
    );
}