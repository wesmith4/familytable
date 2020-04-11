import React from 'react';

export default class DisplayRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      ingredients: props.ingredients,
      directions: props.directions,
      notes: props.notes,
      image: props.image,
      creator: props.creator
    }
  }

  /* getRecipe() {
    fetch
  }

  componentDidMount() {

  } */

  render() {
    let ingredients = this.state.ingredients.map(ingredient => <li>{ingredient}</li>);
    let directions = this.state.directions.map(step => <li>{step}</li>);
    let image;
    if (this.state.image) {
      image = this.state.image;
    }
    return (
      <div className="recipe">
        <img src={image} alt={this.state.title} srcset=""/>
        <h3>{this.state.title}</h3>
        <h5><em>By {this.state.creator}</em></h5>
        <h4>Ingredients:</h4>
        <ul>{ingredients}</ul>
        <h4>Directions:</h4>
        <ol>{directions}</ol>
        <h5>Notes:</h5>
        <p>{this.state.notes}</p>
      </div>
    )
  }
}
