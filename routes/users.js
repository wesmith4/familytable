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
    const payload = {email: user.email};
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
    console.log('New user logged in: ', user);
  } else {
  }
});

router.post('/authenticate', async(req,res,next) => {
  const {email, password} = req.body;

  let user = await User.query().findOne({email: email});
  let passwordValid = user && (await user.verifyPassword(password));

  if (passwordValid) {
    // req.session.userId = user.id;
    const payload = {email: email};
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'});
    res.cookie('token', token, {httpOnly: true}).sendStatus(200);
    console.log('Returning user logged in : ', user);
  } else {
  }
});

router.get('/checkToken', withAuth, async (req,res) => {
  let email = req.email;
  let activeUser = await User.query().findOne({email: email});
  console.log('CHECK TOKEN RUN')
  console.log('Active User: ',activeUser);
  res.status(200).send({user: activeUser});
});


module.exports = router;
