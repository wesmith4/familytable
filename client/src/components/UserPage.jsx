import React from 'react';
import RecipesCollection from './recipes/RecipesCollection';
import NewRecipe2 from './recipes/NewRecipe2';
import Clock from './Clock';
import ImageCarousel from './ImageCarousel';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
   /*  fetch('/secret/userPage').then(res => res.json())
      .then(res => this.setState({user: res.user})); */
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch('/secret/userPage').then(res => res.json())
      .then(res => this.setState({user: res.user}));
  }

  render() {
    let user = this.state.user;
    return (
      <div className="userPage container-fluid">
        <div className="row">
          <div className="col-9">
            <h1 className="display-1">Welcome</h1>
            <Clock />
            {/* The carousel of images/recipes goes here */}
            <ImageCarousel />

            <a href="/newRecipe"><Button>New Recipe</Button></a>

          </div>
          <div className="col-3">
            {/* Recipes list sidebar goes here */}
            <RecipesCollection recipes={user.recipes} />
          </div>
        </div>

      </div>
    )
  }
}
