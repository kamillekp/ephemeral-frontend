import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import api from "../../Services/api";
import './style.css';

import Menu from '../../templates/Menu';
import ContentHeaderLogado from '../../templates/ContentHeaderLogado';
import ContentHomeHelp from '../../templates/ContentHomeHelp';
import Rodape from '../../templates/Rodape';
import ContentRodape1 from '../../templates/ContentRodape1';
import Rodape2 from '../../templates/Rodape2';

export default function Update() {     
    const [senha, setSenha] = useState('');
    const [dataNasc, setDataNascimento] = useState('');
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

    const [validaAtiv, setValidaAtiv] = useState('');
    const [idade, setIdade] = useState(18);
    var dataNascimento = dataNasc.split('-');

    const [verificaToken, setToken] = useState(true);
    const history = useHistory();
    const id = localStorage.getItem('Token');

    function testaIdade () {
        const dataAtual = new Date ();
        const mesAtual = dataAtual.getMonth() + 1;  
        var idadeP = dataAtual.getFullYear() - dataNascimento[0];
        setIdade(idadeP);
        console.log(idadeP)

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

    async function atualizar(e) {
        e.preventDefault();
        try {
            var atividade, opcaoTipoAnimal, opcaoSexo, ajudaEmergencia, opcaoAnimalEspecial, dividirDespesas;
            var dataLT;
            dataNascimento = dataNascimento[2] + '/' + dataNascimento[1] + '/' + dataNascimento[0];

            const dataProtetor = {
                senha,
                dataNascimento,
                ddd,
                numeroTel,
                nome, 
                cidade,
                bairro,
                estado,
                complemento}

            
            if (ativ === 'Ativo' && opTipoAnimal!=="" && opSexo!=="" && ajEmergencia!=="" && opAnimalEspecial!=="" && dividDespesas!=="") {
                console.log('Entrou A')    
                atividade = 'Ativo';
                opcaoTipoAnimal = opTipoAnimal;
                opcaoSexo = opSexo;
                ajudaEmergencia = ajEmergencia;
                opcaoAnimalEspecial = opAnimalEspecial;
                dividirDespesas = dividDespesas;

                dataLT = {
                    atividade,
                    opcaoTipoAnimal,
                    opcaoSexo,
                    ajudaEmergencia,
                    opcaoAnimalEspecial,
                    dividirDespesas}
            }
            else{
                console.log('Entrou B')
                atividade = 'Inativo';
                opcaoTipoAnimal = '';
                opcaoSexo = '';
                ajudaEmergencia = '';
                opcaoAnimalEspecial = '';
                dividirDespesas = '';
                
                dataLT = {
                    atividade,
                    opcaoTipoAnimal,
                    opcaoSexo,
                    ajudaEmergencia,
                    opcaoAnimalEspecial,
                    dividirDespesas}
            }

            console.log(dataLT);
            localStorage.setItem('Atividade', atividade);

            if(idade >= 18) {
                await api.put(`user/settings/update/${id}`, dataProtetor);
                await api.put(`lt/settings/update/${id}`, dataLT);
                history.push('/myProfile');
            }
            else {
                alert('Os usuários da plataforma devem ter 18 anos ou mais.')
            }
        }
        catch(err) {
            alert('Erro ao atualizar. Tente novamente!')
        }
    };

    useEffect(() => {
        if(!id) {
            setToken(false);
        }
        
        async function takeAtualizar () {
                const responseProtetor = await api.get(`user/settings/${id}`);
                const responseLT = await api.get(`lt/settings/${id}`);

                console.log(responseLT.data);
                console.log(responseProtetor.data);

                //PROTETOR
                var a = JSON.stringify(responseProtetor.data.dataNascimento);
                a = a.substring(1, a.length-1);
                a = a.split('/')
                a = a.reverse()
                a = a[0] + '-' + a[1] + '-' + a[2]

                setDataNascimento(a);
                setNome(responseProtetor.data.nome);
                setDDD(responseProtetor.data.ddd);
                setNumTel(responseProtetor.data.numeroTel);
                setCidade(responseProtetor.data.cidade);
                setBairro(responseProtetor.data.bairro);
                setEstado(responseProtetor.data.estado);
                setComplemento(responseProtetor.data.complemento);

                //LT
                setAtividade(responseLT.data.atividade);
                if(responseLT.data.atividade === 'Ativo') {
                    setValidaAtiv(true);
                }
                else if (responseLT.data.atividade === 'Inativo') {
                    setValidaAtiv(false);
                }

                setOpAnimal(responseLT.data.opcaoTipoAnimal);
                setOpSexo(responseLT.data.opcaoSexo);
                setEmergencia(responseLT.data.ajudaEmergencia);
                setAnimEspecial(responseLT.data.opcaoAnimalEspecial);
                setDespesas(responseLT.data.dividirDespesas);
        }
        takeAtualizar()
    },  []);


    return (
        <div>
            {verificaToken === true && (
                <div className="register-container">
                    <Menu content={ContentHeaderLogado}/>
    
                    <div className="card-container">
                        <div>
                            <form method="put" onSubmit={atualizar}>
                                <h4>Dados pessoais</h4>
                                <input type="password" placeholder="Senha" maxLength="15" pattern='[A-Za-z0-9]+' title='Apenas números e letras'
                                value={senha}
                                onChange={e => setSenha(e.target.value)}/> 
    
                                <input type="date" placeholder="Data de nascimento" pattern='\d{2}\/\d{2}\/\d{4}' required onBlur={testaIdade}
                                value={dataNasc}
                                onChange={e => setDataNascimento(e.target.value)}/>
                                {idade < 18 && idade !== '' && (
                                    <div className='aviso-cont'>
                                        <p className='aviso'>Os usuários devem ser maiores de 18 anos</p>
                                    </div>
                                )}
    
                                <input type="text" placeholder="Nome completo" maxLength="70" required 
                                value={nome}
                                onChange={e => setNome(e.target.value)}/> <br/>
    
                                <input type="numeric" placeholder="DDD" maxLength="2" required pattern='[0-9]{2}' title='Apenas números'
                                value={ddd}
                                onChange={e => setDDD(e.target.value)}/>
    
                                <input type="numeric" placeholder="Nº de telefone" maxLength="9" required pattern='9[0-9]{8}' title='9 obrigatório no início // apenas números'
                                value={numeroTel}
                                onChange={e => setNumTel(e.target.value)}/> 
    
                                <input type="text" placeholder="Estado (UF)" maxLength="2" required pattern='[A-Z]{2}' title='Apenas letras maiúsculas'
                                value={estado}
                                onChange={e => setEstado(e.target.value)}/> 
                                
                                <h4>Endereço</h4>
                                <input type="text" placeholder="Cidade" maxLength="70" required 
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}/>
    
                                <input type="text" placeholder="Bairro" maxLength="70" required 
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}/> <br/>
                               
    
                                <h4>Complemento</h4>
                                {complemento === 'Casa' && (
                                    <div>
                                        <input checked type="radio" id="Casa" name="complement" 
                                        value="Casa"
                                        onChange={e => setComplemento(e.target.value)}/>
                                        <label for="Casa">Casa</label>  
    
                                        <input type="radio" id="Apto" name="complement" 
                                        value="Apto"
                                        onChange={e => setComplemento(e.target.value)}/> 
                                        <label for="Apto">Apto</label>
                                    </div>
                                )}
                                {complemento === 'Apto' && (
                                    <div>
                                        <input type="radio" id="Casa" name="complement" 
                                        value="Casa"
                                        onChange={e => setComplemento(e.target.value)}/>
                                        <label for="Casa">Casa</label>  
    
                                        <input checked type="radio" id="Apto" name="complement" 
                                        value="Apto"
                                        onChange={e => setComplemento(e.target.value)}/> 
                                        <label for="Apto">Apto</label>
                                    </div>
                                )}
                                                                            
                                <hr></hr>
                
                                <h4>Preferências</h4>
                                <p className="questions">Você deseja ser um voluntário a lar temporário? <br/> Se sim, informe suas preferências, caso contrário, apenas informe não e envie os dados.</p>
                                {ativ ===  'Ativo' && (
                                    <div>
                                        <input checked type="radio" id="ativo" name="opcaoVol" 
                                        value="Ativo" 
                                        onChange={e => setAtividade(e.target.value)}/>
                                        <label for="ativo">Sim</label>    
    
                                        <input type="radio" id="desativo" name="opcaoVol" 
                                        value="Inativo"
                                        onChange={e => setAtividade(e.target.value)}/> 
                                        <label for="desativo">Não</label>
                                    </div>
                                )}
                                {ativ ===  'Inativo' && (
                                    <div>
                                        <input type="radio" id="ativo" name="opcaoVol" 
                                        value="Ativo" 
                                        onChange={e => setAtividade(e.target.value)}/>
                                        <label for="ativo">Sim</label>    
    
                                        <input checked type="radio" id="desativo" name="opcaoVol" 
                                        value="Inativo"
                                        onChange={e => setAtividade(e.target.value)}/> 
                                        <label for="desativo">Não</label> 
                                    </div>
                                )}
                                                        
    
    
    
                                {validaAtiv === true && (
                                    <div>           
                                        {ativ === 'Ativo' && (
                                            <div>
                                                {opTipoAnimal === 'Cães' && (
                                                    <div>
                                                        <p className="questions">Quais tipos de animal você receberia em sua casa?</p>
                                                        <input checked type="radio" id="cao" name="tipoAnimal" 
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
                                                    </div>
                                                )}
                                                {opTipoAnimal === 'Gatos' && (
                                                    <div>
                                                        <p  className="questions">Quais tipos de animal você receberia em sua casa?</p>
                                                        <input type="radio" id="cao" name="tipoAnimal" 
                                                        value="Cães"
                                                        onChange={e => setOpAnimal(e.target.value)}/>
                                                        <label for="cao">Cão</label> 
    
                                                        <input checked type="radio" id="gato" name="tipoAnimal" 
                                                        value="Gatos"
                                                        onChange={e => setOpAnimal(e.target.value)}/> 
                                                        <label for="gato">Gato</label> 
    
                                                        <input type="radio" id="ambos1" name="tipoAnimal" 
                                                        value="Cães e Gatos"
                                                        onChange={e => setOpAnimal(e.target.value)}/> 
                                                        <label for="ambos1">Ambos</label> 
                                                    </div>
                                                )}
                                                {opTipoAnimal === 'Cães e Gatos' && (
                                                    <div>
                                                        <p  className="questions">Quais tipos de animal você receberia em sua casa?</p>
                                                        <input type="radio" id="cao" name="tipoAnimal" 
                                                        value="Cães"
                                                        onChange={e => setOpAnimal(e.target.value)}/>
                                                        <label for="cao">Cão</label> 
    
                                                        <input type="radio" id="gato" name="tipoAnimal" 
                                                        value="Gatos"
                                                        onChange={e => setOpAnimal(e.target.value)}/> 
                                                        <label for="gato">Gato</label> 
    
                                                        <input  checked type="radio" id="ambos1" name="tipoAnimal" 
                                                        value="Cães e Gatos"
                                                        onChange={e => setOpAnimal(e.target.value)}/> 
                                                        <label for="ambos1">Ambos</label> 
                                                    </div>
                                                )}
    
    
                                                {opSexo === 'Fêmeas' && (
                                                    <div>
                                                        <p className="questions">Quais dos sexos você pode cuidar?</p>
                                                        <input checked type="radio" id="femea" name="tipoSexo" 
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
                                                    </div>
                                                )}
                                                {opSexo === 'Machos' && (
                                                    <div>
                                                        <p className="questions">Quais dos sexos você pode cuidar?</p>
                                                        <input type="radio" id="femea" name="tipoSexo" 
                                                        value="Fêmeas"
                                                        onChange={e => setOpSexo(e.target.value)}/>
                                                        <label for="femea">Fêmea</label> 
    
                                                        <input checked type="radio" id="macho" name="tipoSexo" 
                                                        value="Machos"
                                                        onChange={e => setOpSexo(e.target.value)}/> 
                                                        <label for="macho">Macho</label>
    
                                                        <input type="radio" id="ambos2" name="tipoSexo" 
                                                        value="Fêmeas e Machos"
                                                        onChange={e => setOpSexo(e.target.value)}/> 
                                                        <label for="ambos2">Ambos</label> 
                                                    </div>
                                                )}
                                                {opSexo === 'Fêmeas e Machos' && (
                                                    <div>
                                                        <p className="questions">Quais dos sexos você pode cuidar?</p>
                                                        <input type="radio" id="femea" name="tipoSexo" 
                                                        value="Fêmeas"
                                                        onChange={e => setOpSexo(e.target.value)}/>
                                                        <label for="femea">Fêmea</label> 
    
                                                        <input type="radio" id="macho" name="tipoSexo" 
                                                        value="Machos"
                                                        onChange={e => setOpSexo(e.target.value)}/> 
                                                        <label for="macho">Macho</label>
    
                                                        <input checked type="radio" id="ambos2" name="tipoSexo" 
                                                        value="Fêmeas e Machos"
                                                        onChange={e => setOpSexo(e.target.value)}/> 
                                                        <label for="ambos2">Ambos</label> 
                                                    </div>
                                                )}
                                                
    
                                                {ajEmergencia !== 'Não' && (
                                                    <div>
                                                        <p className="questions">Você tem meios para lidar com uma emergência?</p>
                                                        <input checked type="radio" id="pode" name="sos" 
                                                        value="Tem meios para lidar com emergência"
                                                        onChange={e => setEmergencia(e.target.value)}/>
                                                        <label for="pode">Sim</label>     
    
                                                        <input type="radio" id="nPode" name="sos" 
                                                        value="Não"
                                                        onChange={e => setEmergencia(e.target.value)}/> 
                                                        <label for="nPode">Não</label>
                                                    </div>
                                                )}
                                                {ajEmergencia === 'Não' && (
                                                    <div>
                                                        <p className="questions">Você tem meios para lidar com uma emergência?</p>
                                                        <input type="radio" id="pode" name="sos" 
                                                        value="Tem meios para lidar com emergência"
                                                        onChange={e => setEmergencia(e.target.value)}/>
                                                        <label for="pode">Sim</label>     
    
                                                        <input checked type="radio" id="nPode" name="sos" 
                                                        value="Não"
                                                        onChange={e => setEmergencia(e.target.value)}/> 
                                                        <label for="nPode">Não</label>
                                                    </div>
                                                )}
                                            
                                                
                                                {opAnimalEspecial !== 'Não' && (
                                                    <div>
                                                        <p className="questions">Você pode cuidar de animais que tenham alguma necessidade especial?</p>
                                                        <input checked type="radio" id="s" name="df" 
                                                        value="Acolhe animais com necessidades especiais"
                                                        onChange={e => setAnimEspecial(e.target.value)}/>
                                                        <label for="s">Sim</label>  
    
                                                        <input type="radio" id="n" name="df" 
                                                        value="Não"
                                                        onChange={e => setAnimEspecial(e.target.value)}/> 
                                                        <label for="n">Não</label>
                                                    </div>
                                                )}
                                                {opAnimalEspecial === 'Não' && (
                                                    <div>
                                                        <p className="questions">Você pode cuidar de animais que tenham alguma necessidade especial?</p>
                                                        <input type="radio" id="s" name="df" 
                                                        value="Acolhe animais com necessidades especiais"
                                                        onChange={e => setAnimEspecial(e.target.value)}/>
                                                        <label for="s">Sim</label>  
    
                                                        <input checked type="radio" id="n" name="df" 
                                                        value="Não"
                                                        onChange={e => setAnimEspecial(e.target.value)}/> 
                                                        <label for="n">Não</label>
                                                    </div>
                                                )}
    
                                                
                                                {dividDespesas !==  'Não' && (
                                                    <div>
                                                        <p className="questions">Você tem condições para dividir ou ajudar com as despesas sobre os cuidados do animal?</p>
                                                        <input checked type="radio" id="tem" name="despesa" 
                                                        value="Tem condições de dividir as despesas do animal"
                                                        onChange={e => setDespesas(e.target.value)}/>
                                                        <label for="tem">Sim</label>
    
                                                        <input type="radio" id="nTem" name="despesa" 
                                                        value="Não"
                                                        onChange={e => setDespesas(e.target.value)}/> 
                                                        <label for="nTem">Não</label>   
                                                    </div>
                                                )}
                                                {dividDespesas ===  'Não' && (
                                                    <div>
                                                        <p className="questions">Você tem condições para dividir ou ajudar com as despesas sobre os cuidados do animal?</p>
                                                        <input  type="radio" id="tem" name="despesa" 
                                                        value="Tem condições de dividir as despesas do animal"
                                                        onChange={e => setDespesas(e.target.value)}/>
                                                        <label for="tem">Sim</label>
    
                                                        <input checked type="radio" id="nTem" name="despesa" 
                                                        value="Não"
                                                        onChange={e => setDespesas(e.target.value)}/> 
                                                        <label for="nTem">Não</label>   
                                                    </div>
                                                )}
                                            </div>
                                        )}                                                  
                                    </div>
                                )}  
    
    
                    
                                {validaAtiv === false && (
                                    <div>
                                        {ativ === 'Ativo' && (
                                            <div>
                                                <p className="questions">Quais tipos de animal você receberia em sua casa?</p>
                                                <input type="radio" id="cao" name="tipoAnimal" required
                                                value="Cães"
                                                onChange={e => setOpAnimal(e.target.value)}/>
                                                <label for="cao">Cão</label> 
    
                                                <input type="radio" id="gato" name="tipoAnimal" required
                                                value="Gatos"
                                                onChange={e => setOpAnimal(e.target.value)}/> 
                                                <label for="gato">Gato</label> 
    
                                                <input type="radio" id="ambos1" name="tipoAnimal" required
                                                value="Cães e Gatos"
                                                onChange={e => setOpAnimal(e.target.value)}/> 
                                                <label for="ambos1">Ambos</label> 
    
    
                                                <p className="questions">Quais dos sexos você pode cuidar?</p>
                                                <input type="radio" id="femea" name="tipoSexo" required
                                                value="Fêmeas"
                                                onChange={e => setOpSexo(e.target.value)}/>
                                                <label for="femea">Fêmea</label> 
    
                                                <input type="radio" id="macho" name="tipoSexo" required
                                                value="Machos"
                                                onChange={e => setOpSexo(e.target.value)}/> 
                                                <label for="macho">Macho</label>
    
                                                <input type="radio" id="ambos2" name="tipoSexo" required
                                                value="Fêmeas e Machos"
                                                onChange={e => setOpSexo(e.target.value)}/> 
                                                <label for="ambos2">Ambos</label> 
    
    
                                                <p className="questions">Você tem meios para lidar com uma emergência?</p>
                                                <input type="radio" id="pode" name="sos" required
                                                value="Tem meios para lidar com emergência"
                                                onChange={e => setEmergencia(e.target.value)}/>
                                                <label for="pode">Sim</label>     
    
                                                <input type="radio" id="nPode" name="sos" 
                                                value="Não"
                                                onChange={e => setEmergencia(e.target.value)}/> 
                                                <label for="nPode">Não</label>
    
    
                                                <p className="questions">Você pode cuidar de animais que contenham alguma deficiência física?</p>
                                                <input type="radio" id="s" name="df" required
                                                value="Acolhe animais com necessidades especiais"
                                                onChange={e => setAnimEspecial(e.target.value)}/>
                                                <label for="s">Sim</label>  
    
                                                <input type="radio" id="n" name="df" 
                                                value="Não"
                                                onChange={e => setAnimEspecial(e.target.value)}/> 
                                                <label for="n">Não</label>
    
    
                                                <p className="questions">Você tem condições para dividir ou ajudar com as despesas sobre os cuidados do animal?</p>
                                                <input type="radio" id="tem" name="despesa" required
                                                value="Tem condições de dividir as despesas do anima"
                                                onChange={e => setDespesas(e.target.value)}/>
                                                <label for="tem">Sim</label>
    
                                                <input type="radio" id="nTem" name="despesa" required
                                                value="Não"
                                                onChange={e => setDespesas(e.target.value)}/> 
                                                <label for="nTem">Não</label>
                                            </div>
                                        )}                                                                          
                                    </div>
                                )}
                                                        
                                <br/>
    
                                <div className="sendContainer">
                                    <button type="submit" value="submit">Enviar</button>
                                </div>
                            </form>  
                        </div>  
                    </div>
    
                    <Rodape content={ContentRodape1}/>
                    <Rodape2/>
                </div>
            )}




            {verificaToken === false && (
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
            )}
        </div>
    );
}