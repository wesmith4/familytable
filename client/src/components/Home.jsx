import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserPage from './UserPage';
import UserBar from './UserBar';
import Clock from './Clock';
import Login from './Login';
import Register from './Register';
import withAuth from './withAuth';
import DisplayRecipe from './recipes/DisplayRecipe';
import NewRecipe2 from './recipes/NewRecipe2';


export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading ...',
      hasActiveUser: false,
      user: {}
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch('/secret/userPage').then(res => res.json())
      .then(res => this.setState({user: res.user, hasActiveUser: true}));
  }


  render() {
    if (this.state.hasActiveUser) {
      return (
        <div>
          <UserBar user={this.state.user}/>
          {/* <UserPage user={this.state.user}/> */}


          <Router>
            <Switch>
              <Route exact path="/" component={UserPage} />
              <Route exact path="/users/authenticate" component={Login} />
              <Route exact path="/users/register" component={Register} />
              <Route exact path="/userPage" component={withAuth(UserPage)} />
              <Route exact path="/newRecipe" component={withAuth(NewRecipe2)} />
              <Route exact path="/recipes/:recipeId" component={withAuth(DisplayRecipe)} />
            </Switch>
          </Router>

        </div>
      )
    } else {
      return (
        <div>
          <Clock />
        </div>
      )
    }
  }
}
