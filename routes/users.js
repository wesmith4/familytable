var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');

let User = require('../models/User');


router.post('/register', async(req,res,next) => {
  const { email, password, username, fullName } = req.body;
  let user = await User.query().insert({
    email: email,
    password: password,
    username: username,
    fullName: fullName
  });

  if (user) {
    // req.session.userId = user.id;
    const payload = user.email;
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
    console.log('New user logged in: ', user);
    res.redirect('/secret');
  } else {
    res.redirect('/register');
  }
});

router.post('/authenticate', async(req,res,next) => {
  const {email, password} = req.body;

  let user = await User.query().findOne({email: email});
  let passwordValid = user && (await user.verifyPassword(password));

  if (passwordValid) {
    // req.session.userId = user.id;
    const payload = email;
    const token = jwt.sign(payload, process.env.SECRET);
    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
    console.log('Returning user logged in : ', user);
  } else {
    res.redirect('/authenticate');
  }
});

router.get('/checkToken', withAuth, async (req,res) => {
  res.sendStatus(200);
});


module.exports = router;
