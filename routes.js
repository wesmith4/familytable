let User = require('./models/User');
let Recipe = require('./models/Recipe');
let Router = require('express-promise-router');
let router = new Router();

router.get('/login', async(req,res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('main', {login: true});
  }
});

router.post('/login', async(req,res) => {
  let {email, password} = req.body;

  let user = await User.query().findOne({email: email});
  let passwordValid = user && (await user.verifyPassword(password));

  if (passwordValid) {
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.render('main', {invalidLogin: true})
  }
});

router.get('/register', (req,res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('main', {register: true});
  }
});

router.post('/register', async(req,res) => {
  let newUser = req.body.newUser;

  let user = await User.query().insert(newUser);

  if (user) {
    req.session.userId = user.id;
    res.redirect('/');
  } else {
    res.render('main', {invalidRegister: true});
  }
});

router.post('/sign-out', (req,res) => {
  req.session.userId = null;
  res.redirect('/');
});

router.get('/', async(req,res) => {

  if (req.user) {
    let user = req.user;
    let recipes = await user.$relatedQuery('recipes').orderBy('title');
    for (let recipe of recipes) {
      recipe['ingredients'] = await recipe.$relatedQuery('ingredients');
      recipe['directions'] = await recipe.$relatedQuery('directions').orderBy('id');
    }
    user['recipes'] = recipes;
    console.log('Active User: ', user.fullName);
    res.render('main', {user});
  } else {
    res.render('main', {welcome: true});
  }
});

router.get('/newRecipe', async(req,res) => {
  let user = req.user;
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
  res.render('NewRecipe', {user});
});

router.post('/newRecipe', async(req,res) => {
  let user = req.user;
  console.log('Attempting to upload new recipe for user: ', user.fullName);

  let recipe = req.body.recipe;
  console.log('Recipe: ', recipe);
  console.log('Ingredients', recipe.ingredients);
  console.log('Directions: ', recipe.directions);
 /*  let newRecipe = JSON.parse(JSON.stringify(req.body));
  console.log('Form body: ', newRecipe);
  */
  // let newRecipe = await Recipe.query().insertGraph([req.body.recipe]);
  let insertedRecipe = await Recipe.query().insertGraph([{
    title: recipe.title,
    creatorName: recipe.creatorName,
    story: recipe.story,
    userId: user.id,
    ingredients: recipe.ingredients,
    directions: recipe.directions,
    notes: recipe.notes
  }]);

  if (insertedRecipe) {
    res.redirect('/');
  } else {

    res.redirect('/newRecipe');
  }

});

router.get('/recipes', async(req,res) => {

  let recipeId = Number(req.query.id);
  let user = req.user;

  let recipe = await Recipe.query().findById(recipeId);
  console.log(recipe);

  // Verify user
  if (recipe.userId !== user.id) {
    res.redirect('/login');
  }

  recipe['ingredients'] = await recipe.$relatedQuery('ingredients');
  recipe['directions'] = await recipe.$relatedQuery('directions').orderBy('id');

  res.render('displayRecipe', {recipe, user});
});

router.get('/recipes/search', async(req,res) => {
  let searchTerm = req.query.term;
  let user = req.user;

  if (user) {
    let results = await user.$relatedQuery('recipes')
      .where('title', 'ilike', `%${searchTerm}%`);

    console.log(results);

    res.render('searchResults', {user, results, searchTerm});
  }


})

module.exports = router;
