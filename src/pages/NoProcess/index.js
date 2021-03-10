import React from 'react';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';

export default function NoAccess() {
    return (
        <div>
            <Menu content={ContentHeaderLogado}/>

            <div className='error-container'>
                <div className="quadradoAlert"> 
                    <p className='exclamacao'> ? <br/> 
                        <p className='errorContainer'> Not Found <br/> 
                            <p className='textContainer'> Você não tem processos cadastrados.</p>
                        </p>
                    </p>
                </div>
            </div>
        </div>
    );
}