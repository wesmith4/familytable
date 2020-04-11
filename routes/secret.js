const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');

let User = require('../models/User');
let Recipe = require('../models/Recipe');


router.get('/myrecipes', (req,res,next) => {
  console.log(req.cookies.token);
  let token = req.cookies.token;
  res.json(token);
});

module.exports = router;
