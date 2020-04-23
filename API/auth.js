let express = require('express');
let router = express.Router();
let User = require('../models/User');

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
  let newUser = req.body;
  console.log(newUser);

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

module.exports = router;
