const createSubTask = require('../controllers/subTask/createSubTask');
const deleteSubTask = require('../controllers/subTask/deleteSubTask');
const updateSubTask = require('../controllers/subTask/updateSubTask');
const createTodo = require('../controllers/todo/createTodo');
const deleteTodo = require('../controllers/todo/deleteTodo');
const fetchAllTodos = require('../controllers/todo/fetchAllTodos');
const getTodo = require('../controllers/todo/getTodo');
const updateTodo = require('../controllers/todo/updateTodo');
const verifyToken = require('../middleware/verifyToken');
const wrap = require('../utils/wrap');
const { validate } = require('../validations');
const createTaskValidate = require('../validations/task/createTask.validate');
const deleteTaskValidate = require('../validations/task/deleteTask.validate');
const updateTaskValidate = require('../validations/task/updateTask.validate');

const todoRouter = require('express').Router();

todoRouter.get('/', verifyToken, wrap(fetchAllTodos));

todoRouter.get('/:todoId', verifyToken, wrap(getTodo));

todoRouter.post('/', verifyToken, wrap(createTodo));

todoRouter.patch('/:todoId', verifyToken, wrap(updateTodo));

todoRouter.delete('/:todoId', verifyToken, wrap(deleteTodo));

todoRouter.post('/:todoId/:taskId', verifyToken, wrap(createSubTask));

todoRouter.patch('/:todoId/:taskId', verifyToken, wrap(updateSubTask));

todoRouter.delete('/:todoId/:taskId', verifyToken, wrap(deleteSubTask));

module.exports = todoRouter;