const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// connect to mongodb
const db = mongoose.connect('mongodb://localhost/express-mongo-api');
// const bookRouter = express.Router();
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

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
