import React, {useEffect, useState} from 'react';
import api from '../../Services/api';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';
import CardEA from '../../templates/CardEA';
import CardProt from '../../templates/CardProt';
import CardC from '../../templates/CardC';
import { useHistory } from 'react-router-dom';

export default function TakeProcesses () {
    const [verifica, setVerifica] = useState('');
    const [processPT, setProcessPT] = useState([]);
    const [processLTEA, setProcessLTEA] = useState([]);
    const [processLTC, setProcessLTC] = useState([])


    const id = localStorage.getItem('Token');
    const atividade = localStorage.getItem('Atividade');
    const history = useHistory();

    useEffect (() => {
        if(!id) {
            history.push('/error');
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
                history.push('noProcess');
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
            <Menu content={ContentHeaderLogado}/>

            <div className="containerMaximum">
                <div className="cardContainers">
                    <div className="abas-container">
                        {processPT.length !== 0 && (processLTEA.length !== 0 || processLTC !== 0) && (
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
                        {atividade === 'Ativo' && processLTEA.length === 0 && processLTC.length === 0 && (
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
    );
}