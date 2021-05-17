import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './authProtection/auth';

import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <div className='App' id='main-app'>
        <AppNavbar />
        <div className='container mt-5'>
          <Switch>
            <Route exact path='/' component={UserIsAuthenticated(Dashboard)} />
            <Route exact path='/client/add' component={UserIsAuthenticated(AddClient)} />
            <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClient)} />
            <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetails)} />
            <Route exact path='/login' component={UserIsNotAuthenticated(Login)} />
            <Route exact path='/register' component={UserIsNotAuthenticated(Register)} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
