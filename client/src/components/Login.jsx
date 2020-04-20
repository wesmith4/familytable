import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]:value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
        return <Redirect to="/userPage" />;
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Please try logging in again');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Log In</h1>
        <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required/>
        <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange} required/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default Login;
