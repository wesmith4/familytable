import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import withAuth from './components/withAuth';
import UserPage from './components/UserPage';
// import { Router } from 'express';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href="/"><h1>Family Table</h1></a>
      </header>

      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/users/register">Register</Link></li>
          <li><Link to="/users/authenticate">Login</Link></li>
        </ul>


        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/authenticate" component={Login} />
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/secret" component={withAuth(UserPage)} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;
