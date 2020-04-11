var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/home', async (req,res,next) => {
  res.send('Welcome!');
});

router.get('/api/secret', async (req,res,next) => {
  res.send('The password is "threepio"');
})

module.exports = router;
