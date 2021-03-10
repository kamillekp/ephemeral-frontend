import React from 'react';                

export default function Card ({process}) {
    return (
            <li key={process.idProcesso}>
                <p>{process.userName}</p>
                <p>{process.userNameLT}</p>
                <p>{process.dataAcordo}</p>
                <p>{process.status}</p>
            </li>
    );
}