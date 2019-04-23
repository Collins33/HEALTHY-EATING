const express = require('express');


function routes(Book) {
  const bookRouter = express.Router();
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

  return bookRouter;
}

module.exports = routes;
