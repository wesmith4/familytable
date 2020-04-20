import React from 'react';
import RecipesCollection from './recipes/RecipesCollection';
import Clock from './Clock';


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
    fetch('/secret/userPage').then(res => res.json())
      .then(res => this.setState({user: res.user}));
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch('/secret/userPage').then(res => res.json())
      .then(res => this.setState({user: res.user}));
  }

  render() {
    let user = this.state.user;
    return (
      <div className="userPage container">
        <div className="row">
          <div className="col-9">
            <Clock />
            <h2>Your Recipes</h2>
            <RecipesCollection recipes={user.recipes} />
          </div>
        </div>

      </div>
    )
  }
}
