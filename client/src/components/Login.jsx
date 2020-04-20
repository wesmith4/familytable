import React from 'react';
import { Redirect } from 'react-router-dom';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

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
      <Form onSubmit={this.onSubmit}>
        <h2>Log In</h2>
        <FormGroup className="form-input-list">
          <FormControl type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required/>
          <FormControl type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
        </FormGroup>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  }
}

export default Login;
