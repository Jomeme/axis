// Dev Dependencies
process.env.NODE_ENV = 'development';

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sequelize = require('../database/config/db.config');
const createATodo = require('../handlers/createATodo');
const should = chai.should();

const server = require('../index');
chai.use(chaiHttp);

describe('Todo Tests', () => {

  let user;

  before(async () => {
    // Clear tables.
    await sequelize.sync({ force: true });

    const payload = { username: 'testing', password: '123456' };

    const res = await chai.request(server).post('/api/auth/register').send(payload);

    user = res.body.data;
  });

  /**
   * Performing Unit Tests For Business Rules.
   */

  describe('UNIT TESTS', async () => {
    const asyncExpect = async (method, errorMessage) => {
      let error = null;
      try {
        await method();
      } catch (e) {
        error = e;
        console.log(e.message)
      }

      expect(error).to.be.an('Error');

      if (errorMessage) {
        expect(error.message).to.equal(errorMessage);
      }
    }

    it('It should reject creation due to createdBy field missing', async () => {
      const payload = {
        name: 'A todo op',
        date: '2021-09-03T00:51:18.134Z',
        picture: 'http://upload.com/api/pictures',
      };

      await asyncExpect(() => createATodo(payload), 'notNull Violation: No user found.');
    });

    it('It should reject creation due to short todo name', async () => {
      const payload = {
        name: 'A t',
        date: '2021-09-03T00:51:18.134Z',
        picture: 'http://upload.com/api/pictures',
        createdBy: 1
      };

      await asyncExpect(() => createATodo(payload), 'Validation error: Todo name must have character length between 8 and 15');
    });

    it('It should reject creation due to date being in future', async () => {
      const now = new Date();
      const tomorrow = now.setDate(now.getDate() + 1);
      const payload = {
        name: 'A todo name',
        date: new Date(tomorrow).toISOString(),
        picture: 'http://upload.com/api/pictures',
        createdBy: 1
      };

      await asyncExpect(() => createATodo(payload),);
    });

    it('It should create a todo', async () => {
      const payload = {
        name: 'A todo name',
        date: '2021-09-03T00:51:18.134Z',
        picture: 'http://upload.com/api/pictures',
        createdBy: 1
      };

      const todo = await createATodo(payload);
      expect(todo.toJSON()).to.be.a('object');
      expect(todo.toJSON()).to.have.property('name').to.be.equal('A todo name');
    });
  });

  /**
   * Testing the /GET route for todos
   *
   */
  describe('/GET Todos', () => {
    
    it('It should fail to fetch all todos belonging to the owner with authorization error', async () => {
      const res = await chai.request(server).get('/api/todos');
      res.should.have.status(401);
    });

    it('It should fetch all todos belonging to the owner', async () => {
      const res = await chai.request(server)
        .get('/api/todos')
        .set({ Authorization: `Bearer ${user.token}` });

      res.should.have.status(200);
      res.body.should.have.property('todos').be.a('array');
    })
  });

  describe('/POST Todo', () => {
    it('it should not POST a todo without a name field', async () => {
        let todo = {
          date: "2021-09-03T00:51:18.134Z",
          picture: "http://upload.com/api/pictures"
        }
        const res = await chai.request(server)
          .post('/api/todos')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(todo);

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').be.eql('error');
    });

    it('it should not POST a todo without a picture field', async () => {
        let todo = {
          name: 'Todo name',
          date: "2021-09-03T00:51:18.134Z",
        }
        const res = await chai.request(server)
          .post('/api/todos')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(todo);

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').be.eql('error');
    });

    it('it should not POST a todo without a date field', async () => {
        let todo = {
          name: "Todo name",
          picture: "http://upload.com/api/pictures"
        }
        const res = await chai.request(server)
          .post('/api/todos')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(todo);

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').be.eql('error');
    });

    /**
     * Business Rules
     */
     it('it should not POST a todo with name outside range of 8 to 15', async () => {
        let todo = {
          name: 'A very long todo name',
          date: "2021-09-03T00:51:18.134Z",
          picture: "http://upload.com/api/pictures"
        }
        const res = await chai.request(server)
          .post('/api/todos')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(todo);

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').be.eql('error');
    });

    it('it should not POST a todo with date in the future', async () => {
      const now = new Date();
      const tomorrow = now.setDate(now.getDate() + 1);
        let todo = {
          name: 'A todo name',
          date: new Date(tomorrow).toISOString(),
          picture: "http://upload.com/api/pictures"
        }
        
        const res = await chai.request(server)
          .post('/api/todos')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(todo);

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').be.eql('error');
    });


    it('it should POST a Todo ', async () => {
      let todo = {
        name: 'A todo name',
        date: new Date().toISOString(),
        picture: "http://upload.com/api/pictures"
      }

      const res = await chai.request(server)
          .post('/api/todos')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(todo);
          
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('todo').be.a('object');
    });
  });

  describe('/PATCH Todo', () => {
    it('it should UPDATE a todo given the id', async () => {
      
      const data = await chai.request(server)
        .post('/api/todos')
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          name: 'A todo name',
          date: new Date().toISOString(),
          picture: "http://upload.com/api/pictures"
        });
      const todo = data.body;

      const res = await chai.request(server).patch(`/api/todos/${todo.todo.id}`)
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          name: 'An update'
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Updated successfully.');
      res.body.updatedTodo.should.have.property('name').eql('An update');
    });
  });

  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE todo', () => {
    it('it should DELETE a todo given the id', async () => {
      
      const data = await chai.request(server)
        .post('/api/todos')
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          name: 'A todo name',
          date: new Date().toISOString(),
          picture: "http://upload.com/api/pictures"
        });
        const todo = data.body;

      const res = await chai.request(server).delete(`/api/todos/${todo.todo.id}`)
        .set({ Authorization: `Bearer ${user.token}` });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Deleted successfully');
      res.body.deletedTodo.should.be.a('object');
    });
  });
});