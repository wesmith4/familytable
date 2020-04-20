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

module.exports = router;
