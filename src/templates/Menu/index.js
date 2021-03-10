import React from 'react';
import './style.css';

export default function menu ({content}) {
    const Content = content;
    return (
            <div className="menu-container">
                <Content/>
            </div>
    );
}