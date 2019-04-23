const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connect to mongodb
const db = mongoose.connect('mongodb://localhost/express-mongo-api');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
// create a book model
const Book = require('./models/bookModel');

bookRouter.route('/books')
  .get((req, res) => {
    // query the mongo db to get books
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome human');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
