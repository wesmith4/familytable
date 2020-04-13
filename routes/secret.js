const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');

let User = require('../models/User');
let Recipe = require('../models/Recipe');


router.get('/recipes', withAuth, (req,res,next) => {
  const email = req.email
  let activeUser = {};
  User.findOne({email}, function(err,user) {
    activeUser = user;
  });
  let myRecipes = []
  Recipe.find({ _creator: activeUser._id }, function(err, recipes) {
    myRecipes = recipes;
  })
  res.status(200).send({recipes: myRecipes});
});

router.post('/recipes/new', (req,res) => {

})

module.exports = router;
