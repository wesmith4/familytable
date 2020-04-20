import React from 'react';
import DisplayRecipe from './DisplayRecipe';
// import NewRecipe from './NewRecipe';
import NewRecipe2 from './NewRecipe2';

function showRecipeCard(recipe) {

  let recipeUrl = `/recipes/${recipe.id}`;
  return (
    <li>
      <div className="card-title collapsible-header"><a href={recipeUrl}>{recipe.title}</a></div>
      <div className="collapsible-body">
        <h5 className="card-text"><em>By {recipe.creatorName}</em></h5>
        <h5 className="card-text">Notes:</h5>
        <p className="card-text">{recipe.notes}</p>
      </div>

    </li>

  )
}

export default class RecipesCollection extends React.Component {
  constructor(props) {
    super(props);
    this.getRecipes.bind(this);
    this.state = {
      recipes: []
    };
  }

  getRecipes() {
    fetch('/secret/userPage').then(res => res.json())
      .then(res => {
        this.setState({recipes: res.user.recipes});
      });
  }

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    let recipes = this.state.recipes;

    return (
      <div className="recipesCollection">
        <h2>Your Recipes</h2>
        <ul className="collapsible">
        {recipes.map(showRecipeCard)}
        </ul>

      </div>
    )
  }

}
