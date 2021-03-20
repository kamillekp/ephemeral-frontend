import React, { useState } from 'react';                
import api from '../../Services/api';

export default function CardEA ({process}) {
    const [verifica, setVerifica] = useState('');

    async function updateProcess() {
        setVerifica(true);
    }
    async function deleteProcess() {
        setVerifica(false);
    }

    async function atualiza() {
        if(verifica === true) {
            if(window.confirm('Deseja mesmo aceitar o processo?')) {
                await api.put(`process/atualiza/${process.idProcesso}`);
            }
            else {
                alert('Erro ao atualizar processo. Tente novamente.');
            }
        }
        else if (verifica === false) {
            if(window.confirm('Deseja mesmo deletar o processo?')) {
                await api.delete(`process/deleta/${process.idProcesso}`);
            }
            else {
                alert('Erro ao deletar processo. Tente novamente.');
            }
        }
    }

    return (
            <li key={process.idProcesso}>
                <p>Protetor: {process.userName}</p>
                <p>Lar temporário: {process.userNameLT}</p>
                <p>Status: {process.status}</p>

                <form onSubmit={atualiza}>
                    <div>
                        <button type='submit' className="buttonsProcess" onClick={updateProcess}>aceitar</button>
                        <button type='submit' className="buttonsProcess" onClick={deleteProcess}>negar</button>
                    </div>
                </form>
            </li>
    );
}