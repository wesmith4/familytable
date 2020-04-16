import React from 'react';

export default class NewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      creatorName: '',
      ingredients: [{ingredient: '', quantity: ''}, {ingredient: '', quantity: ''},{ingredient: '', quantity: ''}],
      directions: [{step: 1, action: ''}, {step: 2, action: ''}, {step: 3, action: ''}],
      notes: '',
    }
  }

  handleInputChange = (event) => {
    if (['ingredient', 'quantity'].includes(event.target.className)) {
      let ingredients = [...this.state.ingredients];
      ingredients[event.target.dataset.id][event.target.className] = event.target.value;
      this.setState({ingredients: ingredients});
    } else if (event.target.className === 'action') {
      let directions = [...this.state.directions];
      directions[event.target.dataset.id][event.target.className] = event.target.value;
      this.setState({directions: directions});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
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

  addStep = (event) => {
    let nextNumber = this.state.directions.length + 1;
    this.setState((prevState) => ({
      directions: [ ...prevState.directions, {step: nextNumber, action: ''}]
    }));
  }

  addIngredient = (event) => {
    this.setState((prevState) => ({
      ingredients: [...prevState.ingredients, {ingredient: '', quantity: ''}]
    }))
  };

  removeIngredient = (i) => {
    let ingredients = this.state.ingredients;
    ingredients.splice(i, 1);
    this.setState({ingredients: ingredients});
  }

  removeStep = (i) => {
    let steps = this.state.directions;
    steps.splice(i, 1);
    this.setState({directions: steps});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Add a recipe:</h1>
        <input type="text" name="title" placeholder="Title" value={this.statetitle} onChange={this.handleInputChange} required/>
        <input type="text" name="creatorName" placeholder="Creator" value={this.state.creatorName} onChange={this.handleInputChange} required/>
        <div className="form-group">
          <ul>
          {this.state.ingredients.map((val,idx) => {
            return (
              <li><div className="form-group">
                <input
                  type="text"
                  name="ingredient"
                  data-id={idx}
                  value={this.state.ingredients[idx].ingredient}
                  onChange={this.handleInputChange}
                  className="ingredient"
                  placeholder="Ingredient"/>
                <input
                  type="text"
                  name="quantity"
                  data-id={idx}
                  value={this.state.ingredients[idx].quantity}
                  onChange={this.handleInputChange}
                  className="quantity"
                  placeholder="Quantity"/>
                <button onClick={() => this.removeIngredient(idx)}>Remove</button>
              </div></li>
            )
          })}
          </ul>
          <input type="button" value="Add Ingredient" onClick={this.addIngredient}/>
        </div>
        <div className="form-group">
          <ol>
          {this.state.directions.map((val, idx) => {
            return (
              <li><div className="form-group">
                <input type="text"
                  name=""
                  id=""
                  data-id={idx}
                  value={this.state.directions[idx].action}
                  onChange={this.handleInputChange}
                  className="action"
                  placeholder="Step"/>
                <button onClick={() => this.removeStep(idx)}>Remove</button>
              </div></li>
            )
          })}
          </ol>

          <input type="button" value="Add Step" onClick={this.addStep}/>
        </div>
        <div className="form-group">
          <textarea name="notes" placeholder="Notes" value={this.state.notes} onChange={this.handleInputChange} cols="30" rows="10"></textarea>
        </div>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
