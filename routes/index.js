var express = require('express');
var router = express.Router();
const withAuth = require('../withAuth');


/* GET home page. */


router.get('/api/home', async (req,res,next) => {
  res.send('Welcome!');
});

router.get('/api/secret', async (req,res,next) => {
  res.send('The password is "threepio"');
})

module.exports = router;
