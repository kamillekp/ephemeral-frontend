import React from 'react';                

export default function CardProt ({process}) {
    return (
            <li key={process.idProcesso}>
                <p>Protetor: {process.userName}</p>
                <p>Lar temporário: {process.userNameLT}</p>
                <p>Data do acordo: {process.dataAcordo}</p>
                <p>Status: {process.status}</p>
            </li>
    );
}