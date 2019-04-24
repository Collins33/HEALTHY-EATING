require('should');
const request = require('supertest');
const moongose = require('mongoose');

process.env.ENV = 'Test';
// pull in the app
const app = require('../app.js');

// moongose model for book
const Book = moongose.model('Book');
// supertest agent running app
const agent = request.agent(app);
// done is a callback called when we are done
describe('Book crud test', () => {
  it('should allow crud for a book', (done) => {
    // package to send to the api
    const book = {
      read: false,
      title: 'infinity war',
      genre: 'Fiction',
      author: 'Lev Nikolai',
    };

    agent.post('/api/books')
      .send(book)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('_id');
        // res.body.read.should.not.equal(false);
        done();
      });
  });

  // after each test clean the test database
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    moongose.connection.close();
    app.server.close(done());
  });
});
