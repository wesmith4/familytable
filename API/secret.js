const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');

let User = require('../models/User');
let Recipe = require('../models/Recipe');

router.get('/userPage', withAuth, async (req,res,next) => {
  const email = req.email
  let activeUser = await User.query().findOne({email: email});
  let recipes = await activeUser.$relatedQuery('recipes');
  activeUser['recipes'] = recipes;

  console.log('Getting active user from /secret/userPage :',activeUser);
  console.log(new Date().toLocaleTimeString());
  res.status(200).send({user: activeUser});
});

router.post('/recipes/new', withAuth, async (req,res) => {
  let activeUser = await User.query().findOne({email: req.email});

  console.log('Submitting new recipe...');
  console.log(req.body);
  const { title, creatorName, ingredients, directions, notes } = req.body;


  await Recipe.query().insertGraph([
    {
      title: title,
      creatorName: creatorName,
      userId: activeUser.id,
      notes: notes,
      ingredients: ingredients,
      directions: directions
    }
  ]);

  res.status(200).send('Recipe recorded!');
})

module.exports = router;
