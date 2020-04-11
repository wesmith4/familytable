import React from 'react';
import UserPage from './UserPage';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading ...',
      user: null
    }
  }

  componentDidMount() {
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({message: res}));

    fetch('/users/current').then(res => res.json()).then(res => this.setState({user: res}));
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <h1>Home</h1>
          <UserPage user={this.state.user}/>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Home</h1>
          <p>{this.state.message}</p>
        </div>
      )
    }
  }
}
