import React from 'react';

export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      creatorName: '',
      ingredients: [],
      directions: [],
      notes: '',
      image: ''
    }
  }

  handleInputChange = (event) => {
    const {value, name} = event.target;
    this.setState({[name]:value});
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/secret/recipes/new', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.props.history.push('/secret/recipes/new');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Please try submitting again.');
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Add a recipe:</h1>
        <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required/>
        <input type="text" name="creatorName" placeholder="Creator" value={this.state.creatorName} onChange={this.handleInputChange} required/>

      </form>
    )
  }
}
