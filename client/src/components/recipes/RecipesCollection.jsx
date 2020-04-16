import React from 'react';
import DisplayRecipe from './DisplayRecipe';
import NewRecipe from './NewRecipe';

export default class RecipesCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
  }

  getRecipes() {
    fetch('/secret/myrecipes')
      .then(res => res.json())
      .then(res => this.setState({recipes: res}));
  }

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    let recipes = [];
    for (let each of this.state.recipes) {
      recipes.push(<DisplayRecipe recipe={each} />)
    }
    return (
      <div className="userPage">
        {recipes}
        <NewRecipe />
      </div>
    );
  }

}
