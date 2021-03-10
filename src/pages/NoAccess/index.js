import React from 'react';
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
                        </p>
                    </p>
                </div>
            </div>
        </div>
    );
}