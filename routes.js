let express = require('express');
let router = express.Router();
let User = require('./models/User');
let Recipe = require('./models/Recipe');

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
    console.log('Active User: ', user);
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
  let user = req.user;
  console.log('Attempting to upload new recipe for user: ', user.fullName);

  let data = req.body;
  console.log('Form DATA : ', data);
 /*  let newRecipe = JSON.parse(JSON.stringify(req.body));
  console.log('Form body: ', newRecipe);
  // let newRecipe = await Recipe.query().insertGraph([req.body.recipe]);
  let insertedRecipe = await Recipe.query().insertGraph([{
    title: newRecipe.title,
    creatorName: newRecipe.creatorName,
    userId: req.user.id,
    ingredients: newRecipe.ingredients,
    directions: newRecipe.directions,
    notes: newRecipe.notes
  }]); */

  res.redirect('/');
  /* if (insertedRecipe) {
    res.redirect('/');
  } else {

    res.redirect('/');
  } */

});

module.exports = router;
