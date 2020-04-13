import React from 'react';
import RecipesCollection from './recipes/RecipesCollection';


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      message: ''
    }
  }

  getUser = () => {
    fetch('/users/checkToken').then(res => res.json())
      .then(res => this.setState({user: res.user}));
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    console.log(this.state);
    return (
      <div className="userPage">
        <h2>Your recipes</h2>
        <h3>Hello {this.state.user.fullName}</h3>
        <RecipesCollection user={this.state.user}/>
      </div>
    )
  }
}
