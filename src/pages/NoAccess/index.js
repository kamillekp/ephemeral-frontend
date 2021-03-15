import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';

export default function NoAccess() {
    return (
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
    );
}