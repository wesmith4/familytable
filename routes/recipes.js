let express = require('express');
let router = express.Router();
let withAuth = require('../withAuth');

let User = require('../models/User');
let Recipe = require('../models/Recipe');


router.get('/myrecipes', withAuth, async (req,res) => {
  let activeUser = await User.query().findOne({email: req.email});

  let recipes = await Recipe.query()
    .join('ingredients', 'ingredients.recipe_id', 'recipes.id')
    .join('directions', 'directions.recipe_id', 'recipes.id')
    .where('user_id', activeUser.id);

  console.log(recipes);
  res.status(200).send({recipes: recipes});
});


// Request to view a single recipe in full (with ingredients and directions)
router.get('/:recipeId', withAuth, async (req,res) => {
  let activeUser = await User.query().findOne({email: req.email});
  let thisRecipe = await Recipe.query().findById(req.params.recipeId);
  let permission = (activeUser.id === thisRecipe.userId ? true : false);

  if (permission) {
    let ingredients = await thisRecipe.$relatedQuery('ingredients');
    thisRecipe['ingredients'] = ingredients;
    let directions = await thisRecipe.$relatedQuery('directions').orderBy('id');
    thisRecipe['directions'] = directions;
    console.log(thisRecipe);
    res.status(200).send({recipe: thisRecipe});
  } else {
    res.status(401).send('You do not have permission to see this recipe.');
  }
});

module.exports = router;
