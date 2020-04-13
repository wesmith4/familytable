import React from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        user: {}
      }
    }

    componentDidMount() {
      fetch('/users/checkToken')
        .then(res => {
          if (res.status === 200) {

            this.setState({
              loading: false,
              user: res.user
            });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({loading: false, redirect: true});
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/users/authenticate" />
      }
      return <ComponentToProtect {...this.props} />
    }
  }
}
