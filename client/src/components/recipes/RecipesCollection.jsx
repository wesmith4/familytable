import React from 'react';
import DisplayRecipe from './DisplayRecipe';
// import NewRecipe from './NewRecipe';
import NewRecipe2 from './NewRecipe2';

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
        {recipes.map(each =>
        <DisplayRecipe recipe={each} />)}
      </div>
    )
  }

}
