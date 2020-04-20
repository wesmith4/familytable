import React from 'react';

export default class DisplayRecipe extends React.Component {

  render() {
    let recipe = this.props.recipe;
    return (
      <div className="recipe card">
        <div className="card-body">
          <h3 className="card-title">{recipe.title}</h3>
          <h5 className="card-text"><em>By {recipe.creatorName}</em></h5>
          <h5 className="card-text">Notes:</h5>
          <p className="card-text">{recipe.notes}</p>
        </div>
      </div>
    )
  }
}
