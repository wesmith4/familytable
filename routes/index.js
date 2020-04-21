var express = require('express');
var router = express.Router();
const withAuth = require('../withAuth');


/* GET home page. */


router.get('/api/home', async (req,res,next) => {
  res.send('Welcome!');
});


module.exports = router;
