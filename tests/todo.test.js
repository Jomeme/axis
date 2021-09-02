// Dev Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const { dropDb } = require('../config/db.config');
const should = chai.should();
const TaskModel = require('../model/task');

const server = require('../index');

chai.use(chaiHttp);

describe('Task Tests', () => {

  let user;

  beforeEach(async () => {
    await dropDb();

    const payload = { email: 'testing@test.com', password: '123456', name: 'Test Name'};

    const res = await chai.request(server).post('/api/v1/auth/register').send(payload);

    user = res.body.data;
  });

  /**
   * Testing the /GET route for tasks
   *
   */
  describe('/GET tasks', () => {
    it('It should fail to fetch all tasks belonging to the owner with authorization error', async () => {
      const res = await chai.request(server).get('/api/v1/task');
      res.should.have.status(401);
    });

    it('It should fetch all tasks belonging to the owner', async () => {
      const res = await chai.request(server)
        .get('/api/v1/task')
        .set({ Authorization: `Bearer ${user.token}` });
      res.should.have.status(200);
      res.body.should.have.property('task').be.a('array');
      res.body.task.length.should.be.eql(0);
    })
  });

  describe('/POST task', () => {
    it('it should not POST a task without a description field', async () => {
        let task = {
            title: "The Task",
            due_date: "2021-08-22T23:11:18.206Z",
            notification_time: "2021-08-22T23:11:18.206Z"
        }
        const res = await chai.request(server)
          .post('/api/v1/task')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(task);

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').be.eql('error');
    });


    it('it should POST a task ', async () => {
      let task = {
        title: "A new task",
        description: 'A description of the task',
        due_date: "2021-08-22T23:11:18.206Z",
        notification_time: "2021-08-22T23:11:18.206Z"
      }

      const res = await chai.request(server)
          .post('/api/v1/task')
          .set({ Authorization: `Bearer ${user.token}` })
          .send(task);
      console.log(res.body)
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').be.eql('success');
      res.body.should.have.property('task').be.a('object');
      res.body.should.have.property('task').have.property('is_completed').be.eql(false)
    });
  });

  describe('/PATCH book', () => {
    it('it should UPDATE a task given the id', async () => {
      
      const task = new TaskModel({
        title: "A new task",
        description: 'A description of the task',
        due_date: "2021-08-22T23:11:18.206Z",
        notification_time: "2021-08-22T23:11:18.206Z",
        owner: user.user._id
      });

      const saved = await task.save();

      const res = await chai.request(server).patch('/api/v1/task')
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          task_id: task.id,
          is_completed: true
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Task successfully updated');
      res.body.task.should.have.property('is_completed').eql(true);
    });
  });

  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE task', () => {
    it('it should DELETE a task given the id', async () => {
      const task = new TaskModel({
        title: "A new task",
        description: 'A description of the task',
        due_date: "2021-08-22T23:11:18.206Z",
        notification_time: "2021-08-22T23:11:18.206Z",
        owner: user.user._id
      });

      const saved = await task.save();

      const res = await chai.request(server).delete('/api/v1/task')
        .set({ Authorization: `Bearer ${user.token}` })
        .send({
          task_id: task.id
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Task successfully deleted');
      res.body.task.should.be.a('object');
    });
  });
});