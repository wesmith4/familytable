'use strict'
const domContainer = document.querySelector('#new-recipe-form');

class NewRecipe2 extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      creatorName: '',
      ingredients: [{ingredient: '', quantity: ''}, {ingredient: '', quantity: ''},{ingredient: '', quantity: ''}],
      directions: [{action: ''}, {action: ''}, {action: ''}],
      notes: '',
    }
  }

  componentWillUnmount() {
    this.props.history.push('/');
  }

  handleInputChange = (event) => {
    if (['ingredient', 'quantity'].includes(event.target.name)) {
      let ingredients = [...this.state.ingredients];
      ingredients[event.target.dataset.id][event.target.name] = event.target.value;
      this.setState({ingredients: ingredients});
    } else if (event.target.name === 'action') {
      let directions = [...this.state.directions];
      directions[event.target.dataset.id][event.target.name] = event.target.value;
      this.setState({directions: directions});
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/newRecipe', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(ReactDOM.unmountComponentAtNode(domContainer));

  }

  addStep = (event) => {
    this.setState((prevState) => ({
      directions: [ ...prevState.directions, {action: ''}]
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
      <div className="container-fluid">
        <form onSubmit={this.onSubmit.bind(this)}>
          <i class="fas fa-apple-alt"></i>


          <h1>Add a recipe:</h1>
            <div className="form-group">
              <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required/>
            </div>
            <div class="form-group">
              <input type="text" name="creatorName" placeholder="Creator" value={this.state.creatorName} onChange={this.handleInputChange} required/>
            </div>

          <div class="form-group">
            <h4>Ingredients</h4>
            <ul className="form-input-list">
            {this.state.ingredients.map((val,idx) => {
              return (
                <li><div className="form-group">
                  <div class="form-row">
                  <div className="col-5">
                    <input
                      type="text"
                      name="ingredient"
                      data-id={idx}
                      value={this.state.ingredients[idx].ingredient}
                      onChange={this.handleInputChange}
                      className="ingredient"
                      placeholder="Ingredient"/>
                  </div>
                  <div className="col-5">
                    <input
                      type="text"
                      name="quantity"
                      data-id={idx}
                      value={this.state.ingredients[idx].quantity}
                      onChange={this.handleInputChange}
                      className="quantity"
                      placeholder="Quantity"/>
                  </div>
                  <div className="col-2">
                    <button className="btn btn-secondary" onClick={() => this.removeIngredient(idx)}>Remove</button>
                  </div>
                  </div>
                </div></li>
              )
            })}
            </ul>
            <button className="btn btn-secondary" onClick={this.addIngredient}>Add Ingredient</button>
          </div>
          <div className="form-group">
            <h4>Directions</h4>
            <ol className="form-input-list">
            {this.state.directions.map((val, idx) => {
              return (
                <div className="form-group"><li>
                  <div className="form-row">
                  <div className="col-10">
                    <textarea cols="50" rows="2"
                      /* <input type="text" */
                        name="action"
                        id=""
                        data-id={idx}
                        value={this.state.directions[idx].action}
                        onChange={this.handleInputChange}
                        className="action"
                        placeholder="Step" />
                  </div>
                  <div className="col-2">
                    <button className="btn btn-secondary" onClick={() => this.removeStep(idx)}>Remove</button>
                  </div>
                  </div>
                </li></div>
              )
            })}
            </ol>
            <button className="btn btn-secondary" onClick={this.addStep}>Add Step</button>
          </div>
          <div className="form-group form-input-list">
            <textarea name="notes" placeholder="Notes" value={this.state.notes} onChange={this.handleInputChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<NewRecipe2 />, domContainer);
