import React from 'react';

export default class DisplayRecipe extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      recipe: {}
    }
  }

  componentDidMount() {
    let {recipeId} = this.props.match.params;

    fetch(`/recipes/${recipeId}`).then(res => res.json())
      .then(res => {
        this.setState({recipe: res.recipe, loading: false});
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h4 className="display-4">Loading...</h4>
        </div>
      )
    }
    let recipe = this.state.recipe;
    let {ingredients, directions} = recipe;

    let bulletsStyle = {
      display: 'list-item',
      "list-style-type": 'circle',
    }

    let showIngredients = ingredients.map(ingredient => {
      return (
        <li style={bulletsStyle}>{ingredient.ingredient}: {ingredient.quantity}</li>
      );
    });

    let showDirections = directions.map(step => {
      return (
        <li>{step.action}</li>
      );
    });

    return (
      <div className="recipe">
        <div className="">
          <h3 className="display-3">{recipe.title}</h3>
          <h5 className=""><em>By {recipe.creatorName}</em></h5>
          <h5 className="">Notes:</h5>
          <p className="">{recipe.notes}</p>
          <div>
            <h4>Ingredients:</h4>
            <ul style={bulletsStyle} className="list">{showIngredients}</ul>
          </div>
          <div>
            <h4>Directions:</h4>
            <ol>{showDirections}</ol>
          </div>
        </div>
      </div>
    )
  }
}
