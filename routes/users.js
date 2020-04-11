var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');

let User = require('../models/User');


router.post('/register', async(req,res,next) => {
  const { email, password, username, fullName} = req.body;
  const user = new User({email, password, username, fullName});
  user.save(function(err) {
    if (err) {
      res.status(500).send('Error registering new user: please try again!');
    } else {
      res.status(200).send('Hey there! Welcome to Family Table!');
    }
  });
});

router.post('/authenticate', async(req,res,next) => {
  const {email, password} = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: 'Internal error - Please try again.'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password.'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({error: 'Internal error - Please try again.'});
        } else if (!same) {
          res.status(401).json({error: 'Incorrect email or password'});
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, {httpOnly: true}).sendStatus(200);
        }
      })
    }
  })
});

router.get('/checkToken', withAuth, (req,res) => {
  res.sendStatus(200);
});

module.exports = router;
