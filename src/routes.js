import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//IMPORTAÇÃO DAS PÁGINAS
import TelaPrincipal from './pages/TelaPrincipal';
import Login from './pages/Login';
import Register from './pages/Register';
import Help from './pages/Help';
import ResultLT from './pages/ResultLT';
import Atualizar from './pages/Update';
import OwnProfile from './pages/OwnProfile';
import LtProfile from './pages/LTProfile';
import OwnProcesses from './pages/OwnProcesses';

export default function Routes(){
   return(
       <BrowserRouter>
            <Switch>
                <Route path = "/" exact component={Login}/>
                <Route path = "/home" component={TelaPrincipal}/>
                <Route path = "/register" component={Register}/>
                <Route path = "/help" component={Help}/>
                <Route path = "/resultLT" component={ResultLT}/>
                <Route path = "/settings" component={Atualizar}/>
                <Route path = "/myProfile" component={OwnProfile}/>
                <Route path = "/ltProfile/:idUser" component={LtProfile}/>
                <Route path = "/myProcesses" component={OwnProcesses}/>
            </Switch>
       </BrowserRouter> 
    )
}