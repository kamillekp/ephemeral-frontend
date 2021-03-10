import React from 'react';                
import api from '../../Services/api';

export default function CardEA ({process}) {
;
    async function updateProcess() {
        if(window.confirm('Deseja mesmo aceitar o processo?')) {
            await api.put(`process/atualiza/${process.idProcesso}`);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
        else {
            alert('Erro ao atualizar processo. Tente novamente.');
        }
    }
    async function deleteProcess() {
        if(window.confirm('Deseja mesmo deletar o processo?')) {
            await api.delete(`process/deleta/${process.idProcesso}`);

            // eslint-disable-next-line no-restricted-globals
            window.location.reload();
        }
        else {
            alert('Erro ao deletar processo. Tente novamente.');
        }
    }

    return (
            <li key={process.idProcesso}>
                <p>Protetor: {process.userName}</p>
                <p>Lar temporário: {process.userNameLT}</p>
                <p>Status: {process.status}</p>

                <div>
                    <button className="buttonsProcess" onClick={updateProcess}>aceitar</button>
                    <button className="buttonsProcess" onClick={deleteProcess}>negar</button>
                </div>
            </li>
    );
}