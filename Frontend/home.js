let express = require('express');
router = express.Router();

let Recipe = require('../models/Recipe');

router.get('/', async(req,res) => {

  if (req.user) {
    let user = req.user;
    res.render('main', {user});
  } else {
    res.render('main', {welcome: true});
  }
});

router.get('/newRecipe', async(req,res) => {
  let {numIng, numSteps} = req.query;

  let ingredientInputs = [];
  let directionInputs = [];
  for (let i = 0; i < numIng; i++) {
    ingredientInputs.push('ingredient');
  }
  for (let i = 0; i < numSteps; i++) {
    directionInputs.push('ingredient');
  }

  // let user = req.user;
  res.render('NewRecipe', {ingredientInputs, directionInputs});
});

router.post('/newRecipe', async(req,res) => {
  let newRecipe = await Recipe.query().insertGraph([req.body.recipe]);

  if (newRecipe) {
    res.redirect('/');
  } else {

    res.redirect('/newRecipe?numIng=3&numSteps=3');
  }

})



module.exports = router;
