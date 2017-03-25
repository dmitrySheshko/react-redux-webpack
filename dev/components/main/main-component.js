'use strict';

import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import MainMenu from '../../modules/menu/main-menu-module';
import HomeComponent from '../home/home-component';
import UsersComponent from '../users/users-component';
import AddUserComponent from '../users/add-users-component';

class Main extends React.Component {
    render(){
        return(
            <Router>
                <div className='content'>
                    <MainMenu />
                    <div className='pages'>
                        <Route exact path='/' component={ HomeComponent } />
                        <Route exact path='/users' component={ UsersComponent } />
                        <Route path='/users/add' component={ AddUserComponent } />
                    </div>
                </div>
            </Router>
        );
    }
}

export default Main;