const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// connect to mongodb
if (process.env.ENV === 'Test') {
  console.log('We are testing');
  const db = mongoose.connect('mongodb://localhost/express-mongo-api_test');
} else {
  console.log('Not a test');
  const db = mongoose.connect('mongodb://localhost/express-mongo-api');
}
const port = process.env.PORT || 3000;
// get a book model
const Book = require('./models/bookModel');
// get the book router
// execute it using ()
const bookRouter = require('./routes/bookRouter')(Book);


// use body parser
// allow us to parse the json directly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome human');
});

// returns the server that is listening

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
