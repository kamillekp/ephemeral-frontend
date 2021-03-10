import React, {useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import api from "../../Services/api";
import './style.css';

import Menu from '../../templates/Menu';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';

export default function Register() { 
    const [nomeUser, setUserName] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNasc, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [ddd, setDDD] = useState('');
    const [numeroTel, setNumTel] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('');
    const [ativ, setAtividade] = useState('');
    const [opTipoAnimal, setOpAnimal] = useState('');
    const [opSexo, setOpSexo] = useState('');
    const [ajEmergencia, setEmergencia] = useState('');
    const [opAnimalEspecial, setAnimEspecial] = useState('');
    const [dividDespesas, setDespesas] = useState('');

    const [verifica, setVerifica] = useState('');
    const[forEmail, setForEmail] = useState();
    const [forNome, setForNome] = useState();
    const token = localStorage.getItem('Token');
    const history = useHistory();

    var dataNascimento = dataNasc.split('-');
    const [idade, setIdade] = useState('')
 
    function testaIdade () {
        const dataAtual = new Date ();
        const mesAtual = dataAtual.getMonth() + 1;  
        var idadeP = dataAtual.getFullYear() - dataNascimento[0];
        setIdade(idadeP);

        if(mesAtual < dataNascimento[1]) {
            idadeP --;
            setIdade(idadeP);
        }
        else {
            if(mesAtual === dataNascimento[1]) {
                if(dataAtual.getDate() < dataNascimento[2]) {
                    idadeP--;
                    setIdade(idadeP);
                }
            }
        }
    }

    useEffect (() => {
        if(token) {
            setVerifica(true);
        }
        else {
            setVerifica(false);
        }
    }, [])

    async function registrar (e) {
        e.preventDefault();

        dataNascimento = dataNascimento[2] + '/' + dataNascimento[1] + '/' + dataNascimento[0];
        var atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas, tamAnimal;
        var data;

        try {
            if(ativ==="Ativo" && opTipoAnimal!=="" && opSexo!=="" && ajEmergencia!=="" && opAnimalEspecial!=="" && dividDespesas!=="") {
                atividade = 'Ativo';
                opcaoTipoAnimal = opTipoAnimal;
                opcaoSexo = opSexo;
                ajudaEmergencia = ajEmergencia;
                opcaoAnimalEspecial = opAnimalEspecial;
                dividirDespesas = dividDespesas;

                data = {
                    nomeUser,
                    senha,
                    email, 
                    dataNascimento,
                    ddd,
                    numeroTel,
                    nome, 
                    cidade,
                    bairro,
                    estado,
                    complemento,
                    atividade,
                    opcaoTipoAnimal,
                    opcaoSexo,
                    ajudaEmergencia,
                    opcaoAnimalEspecial,
                    dividirDespesas}
            }
            else {
                atividade = 'Inativo';
                opcaoTipoAnimal = '';
                opcaoSexo = '';
                ajudaEmergencia = '';
                opcaoAnimalEspecial = '';
                dividirDespesas = '';
                tamAnimal = '';
                
                data = {
                    nomeUser,
                    senha,
                    email, 
                    dataNascimento,
                    ddd,
                    numeroTel,
                    nome, 
                    cidade,
                    bairro,
                    estado,
                    complemento,
                    atividade,
                    opcaoTipoAnimal,
                    opcaoSexo,
                    ajudaEmergencia,
                    opcaoAnimalEspecial,
                    dividirDespesas}
            }

            if(forEmail !== true && forNome !== true) {
                await api.post('user', {nomeUser, senha, email, dataNascimento, ddd, numeroTel, nome, cidade, bairro, estado, complemento, atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas, tamAnimal})          
                history.push('/');  
            }
        }
        catch(err){
           alert('Erro ao cadastrar. Tente novamente.');
        }
    }

    async function testeEmail () {
        const response = await api.post('user/teste/em', {email})
        setForEmail(response.data.status); 
    }

    async function testeNome () {
        const response = await api.post('user/teste/nom', {nomeUser})
        setForNome(response.data.status);
    }

    return (
        <div className="register-container">
            {verifica === true && (
                <Menu content={ContentHeaderLogado}/>
            )}
            {verifica === false && (
                <Menu content={ContentHomeHelp}/>
            )}

            <div className="card-container">
                <div>
                    <form method="post" onSubmit={registrar}>
                        <h4>Dados pessoais</h4>
                        <input type="text" placeholder="@username" maxLength="10" minLength="2" required pattern='@{1}[\wãõáí]+' title='@ obrigatório' onBlur={testeNome}
                        value={nomeUser}
                        onChange={e => setUserName(e.target.value)}/> 
                    
                        <input type="password" placeholder="Senha" maxLength="8" required pattern='[A-Za-z0-9]+' title='Apenas números e letras'
                        value={senha}
                        onChange={e => setSenha(e.target.value)}/> 

                        <input type="date" placeholder="Data de nascimento" required pattern='\d{2}\/\d{2}\/\d{4}' onBlur = {testaIdade}
                        value={dataNasc}
                        onChange={e => setDataNascimento(e.target.value)}/> 
                        {idade < 18 && idade !== '' && (
                            <div className='avisoCont'>
                                <p className='aviso'>Os usuários devem ser maiores de 18 anos</p>
                            </div>
                        )}
                        {forNome === true && (
                            <div className='avisoNom'>
                                <p className='aviso'>Esse nome de usuário já existe</p>
                            </div>
                        )}
                        
                        <br/>

                        <input type="email" placeholder="email@gmail.com" maxLength="30" required pattern='^[a-z0-9._]+@gmail.com$' title='prefixo@gmail.com' onBlur={testeEmail}
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>

                        <input type="text" placeholder="Nome Sobrenome" maxLength="30" required pattern='[A-Z]{1}[a-zãõíá]+\s[A-Z]{1}[a-zãõíá]+' title='Nome e sobrenome // letras maiúsculas no início'
                        value={nome}
                        onChange={e => setNome(e.target.value)}/> <br/>
                        {forEmail === true && (
                            <div className='avisoNom'>
                                <p className='aviso'>Esse email já existe</p>
                            </div>
                        )}
                        
                        <input type="numeric" placeholder="DDD" maxLength="2" required pattern='[0-9]{2}' title='Apenas números'
                        value={ddd}
                        onChange={e => setDDD(e.target.value)}/>

                        <input type="numeric" placeholder="Nº de telefone" maxLength="9" required pattern='9[0-9]{8}' title='9 obrigatório no início // apenas números'
                        value={numeroTel}
                        onChange={e => setNumTel(e.target.value)}/> 

            
                        <h4>Endereço</h4>
                        <input type="text" placeholder="Estado (UF)" maxLength="2" required pattern='[A-Z]{2}' title='Apenas letras maiúsculas'
                        value={estado}
                        onChange={e => setEstado(e.target.value)}/> 

                        <input type="text" placeholder="Cidade" maxLength="30" required 
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}/>

                        <input type="text" placeholder="Bairro" maxLength="30" required 
                        value={bairro}
                        onChange={e => setBairro(e.target.value)}/> <br/>
                 
                        <h4>Complemento</h4>
                        <input type="radio" id="Casa" name="complement" required
                        value="Casa"
                        onChange={e => setComplemento(e.target.value)}/>
                        <label for="Casa">Casa</label>  

                        <input type="radio" id="Apto" name="complement" 
                        value="Apto"
                        onChange={e => setComplemento(e.target.value)}/> 
                        <label for="Apto">Apto</label>                                                

                        <hr></hr>
        
                        <h4>Preferências</h4>
                        <p className="questions">Você deseja ser um voluntário a lar temporário? <br/> Se sim, informe suas preferências, caso contrário, apenas informe não e envie os dados.</p>
                        <input type="radio" id="ativo" name="opcaoVol" required
                        value="Ativo" 
                        onChange={e => setAtividade(e.target.value)}/>
                        <label for="ativo">Sim</label>    

                        <input type="radio" id="desativo" name="opcaoVol" 
                        value="Inativo"
                        onChange={e => setAtividade(e.target.value)}/> 
                        <label for="desativo">Não</label>

                        {ativ === 'Ativo' && (
                            <div>
                                <p className="questions">Quais tipos de animal você receberia em sua casa?</p>
                                <input type="radio" id="cao" name="tipoAnimal" 
                                value="Cães"
                                onChange={e => setOpAnimal(e.target.value)}/>
                                <label for="cao">Cão</label> 

                                <input type="radio" id="gato" name="tipoAnimal" 
                                value="Gatos"
                                onChange={e => setOpAnimal(e.target.value)}/> 
                                <label for="gato">Gato</label> 

                                <input type="radio" id="ambos1" name="tipoAnimal" 
                                value="Cães e Gatos"
                                onChange={e => setOpAnimal(e.target.value)}/> 
                                <label for="ambos1">Ambos</label> 


                                <p className="questions">Quais dos sexos você pode cuidar?</p>
                                <input type="radio" id="femea" name="tipoSexo" 
                                value="Fêmeas"
                                onChange={e => setOpSexo(e.target.value)}/>
                                <label for="femea">Fêmea</label> 

                                <input type="radio" id="macho" name="tipoSexo" 
                                value="Machos"
                                onChange={e => setOpSexo(e.target.value)}/> 
                                <label for="macho">Macho</label>

                                <input type="radio" id="ambos2" name="tipoSexo" 
                                value="Fêmeas e Machos"
                                onChange={e => setOpSexo(e.target.value)}/> 
                                <label for="ambos2">Ambos</label> 


                                <p className="questions">Você tem meios para lidar com uma emergência?</p>
                                <input type="radio" id="pode" name="sos" 
                                value="Tem meios para lidar com emergência"
                                onChange={e => setEmergencia(e.target.value)}/>
                                <label for="pode">Sim</label>     

                                <input type="radio" id="nPode" name="sos" 
                                value="Não"
                                onChange={e => setEmergencia(e.target.value)}/> 
                                <label for="nPode">Não</label>


                                <p className="questions">Você pode cuidar de animais que tenham alguma necessidade especial?</p>
                                <input type="radio" id="s" name="df" 
                                value="Acolhe animais com necessidades especiais"
                                onChange={e => setAnimEspecial(e.target.value)}/>
                                <label for="s">Sim</label>  

                                <input type="radio" id="n" name="df" 
                                value="Não"
                                onChange={e => setAnimEspecial(e.target.value)}/> 
                                <label for="n">Não</label>


                                <p className="questions">Você tem condições para dividir ou ajudar com as despesas sobre os cuidados do animal?</p>
                                <input type="radio" id="tem" name="despesa" 
                                value="Tem condições de dividir as despesas do anima"
                                onChange={e => setDespesas(e.target.value)}/>
                                <label for="tem">Sim</label>

                                <input type="radio" id="nTem" name="despesa" 
                                value="Não"
                                onChange={e => setDespesas(e.target.value)}/> 
                                <label for="nTem">Não</label>
                            </div>
                        )}

                        <br/>

                        <div className="sendContainer">
                            <button type="submit" value="submit">Enviar</button>
                            <Link to ="/" className="link"><p>Já possui uma conta? Entre</p></Link>
                        </div>
                    </form>  
                </div>  
            </div>

            <Rodape content={ContentRodape1}/>
            <Rodape2/>
        </div>
    );
}