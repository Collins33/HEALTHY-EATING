function booksController(Book) {
  function post(req, res) {
    const book = new Book(req.body);
    // save book to database
    book.save();
    return res.status(201).json(book);
  }
  function get(req, res) {
    // filter with a query string
    const { query } = req;
    // query the mongo db to get books
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  }
  // expose the functions so that they can be accessed
  return { post, get };
}

module.exports = booksController;
