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

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    console.log(book);
    // save book to database
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    // filter with a query string
    const { query } = req;
    // query the mongo db to get books
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    // get bookid from url
    const { bookId } = req.params;
    Book.findById(bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  });

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome human');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
