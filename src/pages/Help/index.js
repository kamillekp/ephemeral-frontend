import React, { useEffect, useState } from 'react';
import './style.css';

import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';

export default function Help() {
    const token = localStorage.getItem('Token');
    const [verifica, setVerifica] = useState('');

    useEffect (() => {
        if(token) {
            setVerifica(true);
        }
        else {
            setVerifica(false);
        }
    }, [])

    return (
        <div>
            {verifica === true && (
                <Menu content={ContentHeaderLogado}/>
            )}
            {verifica === false && (
                <Menu content={ContentHomeHelp}/>
            )}

            <div className="containerPrincipal">
                <div className="dicas-container">
                    <p>
                        <b>O que é um lar temporário (LT)?</b> Um lar temporário disponibiliza sua casa para que cães e gatos abandonados <br/> 
                        tenham um abrigo temporário, alimentação e cuidados, até que sejam adotados por uma família definitiva.
                    </p>

                    <p>
                        <b>Quais os atores do sistem?</b> Temos dois usuários: os responsáveis pelo animal (entidade individual ou ONG) e <br/> os voluntários a lar temporário. 
                    </p>

                    <p>
                        <b>Como funciona a participação na plataforma para cada um dos usuários?</b> <br/>     <i>Responsável pelo animal</i>: após se cadastrar no sistema, poderá pesquisar por lares temporários próximos de sua <br/>     localização e entrar em contato com eles. <br/>     <i>Voluntário</i>: a participação dos lares temporários na plataforma se resume ao cadastro.
                    </p>

    
                    <p>
                        <b>Quem pode ser um lar temporário?</b> Qualquer cidadão que tenha mais que 18 nos pode atuar como voluntário no site.
                    </p>
                    
                </div>
            </div>

            <Rodape content={ContentRodape1}/>
            <Rodape2/>
        </div>
    );
}