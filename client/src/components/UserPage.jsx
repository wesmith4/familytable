import React from 'react';
import RecipesCollection from './recipes/RecipesCollection';

export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  getUser() {
    fetch('/users/current').then(res => res.json())
      .then(res => this.setState({user: res}));
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div className="userPage">
        <h2>Your recipes</h2>
        <RecipesCollection />
      </div>
    )
  }
}
