import React from 'react';

class IngredientInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '',
      quantity: ''
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="form-group">
        <input type="text" name="recipe[ingredients][][ingredient]" placeholder="Ingredient" value={this.state.ingredient} onChange={this.handleInputChange} required/>
        <input type="text" name="recipe[ingredients][][quantity]" placeholder="Quantity" value={this.state.quantity} onChange={this.handleInputChange} required/>
      </div>
    )
  }
}

class DirectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: ''
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <input type="text" name="recipe[directions][]" placeholder="Step" value={this.state.step} onChange={this.handleInputChange}/>
    )
  }
}


export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientsForm: [
        <IngredientInput />, <IngredientInput />, <IngredientInput />
      ],
      directionsForm: [
        <DirectionInput />, <DirectionInput />, <DirectionInput />
      ],
      recipe: {
        title: '',
        creatorName: '',
        ingredients: [],
        directions: [],
        notes: '',
      }
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

  addStep = () => {
    let steps = this.state.directionsForm;
    steps.push(<DirectionInput />);
    this.setState({directionsForm: steps});
  }

  addIngredient = () => {
    let ingredients = this.state.ingredientsForm;
    ingredients.push(<IngredientInput />);
    this.setState({ingredientsForm: ingredients});
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Add a recipe:</h1>
        <input type="text" name="recipe[title]" placeholder="Title" value={this.state.recipe.title} onChange={this.handleInputChange} required/>
        <input type="text" name="recipe[creatorName]" placeholder="Creator" value={this.state.recipe.creatorName} onChange={this.handleInputChange} required/>
        <div className="form-group">
          {this.state.ingredientsForm}
          <input type="button" value="Add Ingredient" onClick={this.addIngredient}/>
        </div>
        <div className="form-group">
          {this.state.directionsForm}
          <input type="button" value="Add Step" onClick={this.addStep}/>
        </div>
        <div className="form-group">
          <textarea name="recipe[notes]" placeholder="Notes" value={this.state.recipe.notes} onChange={this.handleInputChange} cols="30" rows="10"></textarea>
        </div>
      </form>
    )
  }
}
