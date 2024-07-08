const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const should = chai.should();

chai.use(chaiHttp);

let server;

describe('Exchange Rates', () => {
  before((done) => {
    server = app.listen(3001, () => {
      done();
    });
  });

  after((done) => {
    server.close(() => {
      done();
    });
  });

  it('should GET all exchange rates', (done) => {
    chai.request(server)
      .get('/exchange-rates')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('GBP').eql(1.00);
        done();
      });
  });

  it('should GET a specific exchange rate', (done) => {
    chai.request(server)
      .get('/exchange-rates/USD')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('currency').eql('USD');
        res.body.should.have.property('rate').eql(1.33);
        done();
      });
  });

  it('should return 404 for an unknown currency', (done) => {
    chai.request(server)
      .get('/exchange-rates/ABC')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
