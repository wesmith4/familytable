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

      {/* <div>
        <nav class="navbar fixed-top navbar-dark bg-primary">
          <a class="navbar-brand App-link" href="/">Family Table</a>
        </nav>
      </div> */}
      <UserBar />

      <div className="container-fluid">

      <Router>
      {/*   <div className="container">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users/register">Register</Link></li>
            <li><Link to="/users/authenticate">Login</Link></li>
            <li><Link to="/userPage">User Page</Link></li>
          </ul>
        </div> */}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/authenticate" component={Login} />
          <Route exact path="/users/register" component={Register} />
          <Route exact path="/userPage" component={withAuth(UserPage)} />
          <Route exact path="/newRecipe" component={withAuth(NewRecipe2)} />
          <Route exact path="/recipes/:recipeId" component={withAuth(DisplayRecipe)} />

        </Switch>
      </Router>

      </div>
    </div>
  );
}

export default App;
