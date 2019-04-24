/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const express = require('express');
const booksController = require('../controllers/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);
  // add the middleware
  // check if the book exists
  bookRouter.use('/books/:bookId', (req, res, next) => {
    const { bookId } = req.params;
    Book.findById(bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      // if the book exists, pass it downstream to the routes
      if (book) {
        req.book = book;
        return next();
      }
      // if book is not found return 404
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();
      return res.json(book);
    })
    .patch((req, res) => {
      const { book } = req;
      // get an array from req.body
      // will return an array we can loop over
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.status(204);
      });
    });

  return bookRouter;
}

module.exports = routes;
