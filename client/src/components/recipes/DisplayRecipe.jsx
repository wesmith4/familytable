import React from 'react';

export default class DisplayRecipe extends React.Component {

  constructor() {
    super();
    this.state = {
      recipe: {}
    }
  }

  componentDidMount() {
    let {recipeId} = this.props.match.params;

    fetch(`/recipes/${recipeId}`).then(res => res.json())
      .then(res => this.setState({recipe: res.recipe}));
  }

  render() {
    let recipe = this.state.recipe;
    return (
      <div className="recipe card">
        <div className="card-body">
          <h1>This is on the recipe page</h1>
          <h3 className="card-title display-3">{recipe.title}</h3>
          <h5 className="card-text"><em>By {recipe.creatorName}</em></h5>
          <h5 className="card-text display-4">Notes:</h5>
          <p className="card-text">{recipe.notes}</p>
        </div>
      </div>
    )
  }
}
