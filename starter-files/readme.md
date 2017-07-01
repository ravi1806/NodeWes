## Sample Data

To load sample data, run the following command in your terminal:

```bash
npm run sample
```

If you have previously loaded in this data, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```

That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|


## Routing:

```js 
const express = require('express');
const router = express.Router();

// Do work here
// The cb wil run everytime some1 visits this url
// url can be set in app.js file with app.use('url', exportedRoute)
// The cb gives req, res and next()
router.get('/', (req, res) => {
  // res.send('Hey! It works!');
  // const rav = {name: 'Rav', age: 27, cool: true};
  // res.json(rav); // never send data twice, else we get error that headers are already sent
  // res.send(req.query.name);
  // res.json(req.query);

});

router.get('/reverse/:name', (req, res) => {
  // Take the string, make it an array usin spread operator. Reverse the array and then join it back as a string.
  const reverse = [...req.params.name].reverse().join(''); 
  res.send(reverse);
});

module.exports = router;
```
