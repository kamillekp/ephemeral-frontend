import React, {useEffect, useState} from 'react';
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import CardEA from '../../templates/CardEA';
import CardProt from '../../templates/CardProt';
import CardC from '../../templates/CardC';

export default function TakeProcesses () {
    const [verifica, setVerifica] = useState('');
    const [verif, setVerif] = useState('');
    const [processPT, setProcessPT] = useState([]);
    const [processLTEA, setProcessLTEA] = useState([]);
    const [processLTC, setProcessLTC] = useState([])

    const [verificaToken, setToken] = useState(true);
    const id = localStorage.getItem('Token');
    const atividade = localStorage.getItem('Atividade');

    useEffect (() => {
        if(!id) {
            setToken(false);
        }
        
        async function takeAtualizarProcess () {
            const responseP = await api.get(`process/search/protetor/${id}`);
            console.log('P',responseP.data)
            var a = responseP.data
            console.log('P', a.length)
            setProcessPT(responseP.data);

            const responseLTEA = await api.get(`process/search/lt/emAndamento/${id}`);
            console.log('LTEA', responseLTEA.data)
            var b = responseLTEA.data
            console.log('LTEA', b.length)
            setProcessLTEA(responseLTEA.data);

            const responseLTC = await api.get(`process/search/lt/concluido/${id}`);
            console.log('LTC', responseLTC.data)
            var c = responseLTC.data
            console.log('LTC', c.length)
            setProcessLTC(responseLTC.data);

            if(a.length === 0 && b.length === 0 && c.length === 0) {
                setVerif(false);
            }
            else {
                setVerif(true);
            }

            if(atividade === 'Ativo' && (c.length !== 0 || b.length !== 0)) {
                setVerifica(false);
            }
            else {
                setVerifica(true)
            }
        }
        takeAtualizarProcess();
    },   [])

    async function verificarPT() {
        setVerifica(true);
    }

    async function verificarLT() {
        setVerifica(false);
    }

    return (
        <div>
            {verificaToken === true && (
                <div>
                    {verif === true && (
                        <div>
                            <Menu content={ContentHeaderLogado}/>

                            <div className="containerMaximum">
                                <div className="cardContainers">
                                    <div className="abas-container">
                                        {processPT.length !== 0 && (processLTEA.length !== 0 || processLTC.length !== 0) && (
                                            <div className="twoAbas">
                                                <div onClick={verificarPT} className="p">
                                                    PROTETOR
                                                </div>
                                                <div onClick={verificarLT} className="ltp">
                                                    LAR TEMPORÁRIO
                                                </div>
                                            </div>
                                        )}
                                        {atividade === 'Ativo' && processPT.length === 0 && (
                                            <div onClick={verificarLT} className="twoAbas">
                                                <div className="ltp">
                                                    LAR TEMPORÁRIO
                                                </div>
                                            </div>
                                        )} 
                                        {processLTEA.length === 0 && processLTC.length === 0 && (
                                            <div onClick={verificarPT} className="twoAbas">
                                                <div className="p">
                                                    PROTETOR
                                                </div>
                                            </div>
                                        )}      
                                    </div>

                                    <div >
                                        {verifica === true && (
                                            <ul className="containerLis">
                                                {processPT.map(card =>
                                                    <CardProt process={card} key={card.idProcesso}/>
                                                )}
                                            </ul>
                                        )}
                                        {verifica === false && (
                                            <ul className="containerLis">
                                                {processLTEA.map(card =>
                                                    <CardEA process={card} key={card.idProcesso}/>
                                                )}
                                                {processLTC.map(card =>
                                                    <CardC process={card} key={card.idProcesso}/>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Rodape content={ContentRodape1}/>
                            <Rodape2/> 
                        </div>     
                    )}
                    {verif === false && (
                        <div>
                            <Menu content={ContentHeaderLogado}/>

                            <div className='error-container'>
                                <div className="quadradoAlert"> 
                                    <p className='exclamacao'> ? <br/> 
                                        <p className='errorContainer'> NOT FOUND <br/> 
                                            <p className='textContainer'> Você não possui processos cadastrados.</p>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
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