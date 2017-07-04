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

## Templating

```js
extends layout
extends layout will get the layout file which has additional contents.. block content is inside that layout, we just overwrite it here
block content
	//- writing div is optional, we can add classes directly and it will assume its a div there
	.wrapper.classone
		//- Indentations are used to nest, #{} used to render the variable to text.
		//- we can write js in pug files usin - sign
		- const upDog = dog.toUpperCase();
		p.classtwo Hello my dog name is #{upDog}!!!
		//- we could have used inline js too like #{dog.toUpperCase()}!!
		span#idName Yo!
		img(src="dog.jpg" alt="Dog image") 
	//- inside the attributes eg. image's alt we have to write ${dog} inside es6 template strings to render its name, #{} wont work in atts
	h2 
		//- here we use pipe otherwise it will make it a html tag its basically a new line content
		| Hello
		em  How are you?
```
## Model View Controller Pattern

* Create a controller file in the controllers folder. Name it storeController.
* `exports.homePage = (req, res) => { res.render(index) };` in storeController.
* create a pug file in the views folder called index.pug, above code renders this file.
* In the index.js file in routes, import storeController via, `const storeController = require('../controllers/storeController`
* Use it as `route.get('/', storeController.homePage);`

## Middleware

* The work done between req and res is done by middleware.
* next() just means go onto the next middleware or next action.

* An example of a custom middleware

* we first need to configure the route `route.get('/', storeController.myMiddleware, storeController.homePage);
```js
exports.myMiddleware = (req, res, next) => { req.name = 'Ravi'; next() }
exports.homePage = (req, res) => {console.log(req.name);}
```
* Now there are global middleware available too, which occur before every route his hit. All that happens in the app.js file. 
Inside app.use file. We run these middleware even before we hit those routes. eg. Anyone can get images etc. from the public folder, they dont have to hit any route for it. Secondly, bodyParser gets the submitted data on req.body, expressValidator and cookieParser. We can set a cookieParser as `res.cookie('name', 'This is the cookie name', {maxAge: 3300 });` last param being the lifetime of the cookie. Can look up in dev console, Applications, cookie. 

* After all global middleware, we inject our own routes, app.use('/', moduleName);
* Then its the error handlers.
* Make a new error `exports.noFound = (req, res, next) => { const err = new Error('Not Found'); err.status = 404, next(err);} `

## Store Schema

* In the models folder, create a file called store.. add the following code to it
```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a store name' // required: true will throw an ugly error so mention this string
    },
    slug: slug,
    description: {
        type: String,
        trim: true
    },
    tags: [String]
});

// Slug is to be auto generated, we use pre for that.
// save won't happen until we are done with this function.
storeSchema.pre('save', function (next) {
    // so that it doesn't happen everytime we need to use this if clause
    if(!this.isModified('name')){
        next(); // skip it
        return; // stop this fn from running
    }
    // take the name, run it through the slug package we imported at the top
    // set the slug property to whatever the output of the slug is
    this.slug = slug(this.name);
    next();
});

module.exports = mongoose.model('Store', storeSchema);

```
Also import this schema inside start.js 
```js
// Importing all of our models
require('./models/Store');
```

