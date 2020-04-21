import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import withAuth from './components/withAuth';
import UserPage from './components/UserPage';
import UserBar from './components/UserBar';
import NewRecipe2 from './components/recipes/NewRecipe2';
import DisplayRecipe from './components/recipes/DisplayRecipe';
// import { Router } from 'express';

function App() {
  return (
    <div className="App">
      <script src="https://kit.fontawesome.com/c477d04768.js" crossorigin="anonymous"></script>

      <Home />
    </div>
  );
}

export default App;
