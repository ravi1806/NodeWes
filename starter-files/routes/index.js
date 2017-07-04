const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');

router.get('/', storeController.homePage); 
  // (req, res) => {
  // This will look into the views folder to render file, will fetch the pug hello file
  // We can pass info/object to our template as an optional second parameter
  // res.render('hello', {
  //  name: 'ravi',
  //  dog: req.query.dog,
  //  dog: 'snickers'
//  });
// });

router.get('/reverse/:name', (req, res) => {
  // Take the string, make it an array usin spread operator. Reverse the array and then join it back as a string.
  const reverse = [...req.params.name].reverse().join(''); 
  res.send(reverse);
});

module.exports = router;
