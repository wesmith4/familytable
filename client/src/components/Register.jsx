import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      fullName: '',
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]:value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/users/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Please try registering again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Register as new user:</h1>
        <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required/>
        <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange} required/>
        <input type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleInputChange} required/>
        <input type="text" name="fullName" placeholder="Enter full name" value={this.state.fullName} onChange={this.handleInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
