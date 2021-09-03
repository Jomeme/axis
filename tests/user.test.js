// Dev Dependencies
process.env.NODE_ENV = 'development';

const chai = require('chai');
const chaiHttp = require('chai-http');
const sequelize = require('../database/config/db.config');
const should = chai.should();
const server = require('../index');
chai.use(chaiHttp);

describe('User Authentication Tests', () => {

  before(async () => {
    await sequelize.sync({ force: true });
  });

  /**
   * User Registration /POST
   */
  describe('Register User /POST', () => {
    it('It should fail for registration without username entered', async () => {
      const payload = { password: '1234567' };
      const res = await chai.request(server).post('/api/auth/register').send(payload);
      res.should.have.status(400);
    });

    it('It should fail for registration without password entered', async () => {
      const payload = { username: 'test_username' };
      const res = await chai.request(server).post('/api/auth/register').send(payload);
      res.should.have.status(400);
    });

    it('It should pass registration given a username and password', async () => {
      const payload = { username: `test_username`, password: '1234567' };
      const res = await chai.request(server).post('/api/auth/register').send(payload);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data').be.a('object').have.property('token');
    });
  });
});