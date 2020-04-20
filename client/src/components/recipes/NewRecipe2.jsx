import React from 'react';
import { Container, Row, Col, Button, FormControl, FormGroup, FormLabel, Form} from 'react-bootstrap';

export default class NewRecipe2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      creatorName: '',
      ingredients: [{ingredient: '', quantity: ''}, {ingredient: '', quantity: ''},{ingredient: '', quantity: ''}],
      directions: [{action: ''}, {action: ''}, {action: ''}],
      notes: '',
    }
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
    });
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
        <Form onSubmit={this.onSubmit}>
          <i class="fas fa-apple-alt"></i>


          <h1>Add a recipe:</h1>
          <FormGroup className="form-input-list">
            <Form.Group>
              <FormControl type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required/>
            </Form.Group>
            <Form.Group>
              <FormControl type="text" name="creatorName" placeholder="Creator" value={this.state.creatorName} onChange={this.handleInputChange} required/>
            </Form.Group>
          </FormGroup>
          <FormGroup>
            <h4>Ingredients</h4>
            <ul className="form-input-list">
            {this.state.ingredients.map((val,idx) => {
              return (
                <li><FormGroup>
                  <Form.Row>
                  <Col sm="5">
                    <FormControl
                      type="text"
                      name="ingredient"
                      data-id={idx}
                      value={this.state.ingredients[idx].ingredient}
                      onChange={this.handleInputChange}
                      className="ingredient"
                      placeholder="Ingredient"/>
                  </Col>
                  <Col sm="5">
                    <FormControl
                      type="text"
                      name="quantity"
                      data-id={idx}
                      value={this.state.ingredients[idx].quantity}
                      onChange={this.handleInputChange}
                      className="quantity"
                      placeholder="Quantity"/>
                  </Col>
                  <Col sm="2">
                    <Button onClick={() => this.removeIngredient(idx)}>Remove</Button>
                  </Col>
                  </Form.Row>
                </FormGroup></li>
              )
            })}
            </ul>
            <Button onClick={this.addIngredient}>Add Ingredient</Button>
          </FormGroup>
          <FormGroup>
            <h4>Directions</h4>
            <ol className="form-input-list">
            {this.state.directions.map((val, idx) => {
              return (
                <FormGroup><li>
                  <Form.Row>
                  <Col sm="10">
                    <FormControl as="textarea" cols="50" rows="2"
                      /* <input type="text" */
                        name="action"
                        id=""
                        data-id={idx}
                        value={this.state.directions[idx].action}
                        onChange={this.handleInputChange}
                        className="action"
                        placeholder="Step" />
                  </Col>
                  <Col sm="2">
                    <Button variant="primary" onClick={() => this.removeStep(idx)}>Remove</Button>
                  </Col>
                  </Form.Row>
                </li></FormGroup>
              )
            })}
            </ol>
            <Button variant="primary" onClick={this.addStep}>Add Step</Button>
          </FormGroup>
          <FormGroup className="form-input-list">
            <FormControl as="textarea" name="notes" placeholder="Notes" value={this.state.notes} onChange={this.handleInputChange}/>
          </FormGroup>
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </div>
    )
  }
}
