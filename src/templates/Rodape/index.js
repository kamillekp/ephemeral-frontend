import React from 'react';
import './style.css';

export default function Rodape ({content}) {
    const Content = content;
    return (
            <div className="rodape-container">
                <Content/>
                <div className="blankSpace3">aaa</div>
            </div>
    );
}