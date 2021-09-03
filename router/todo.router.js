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
const createTodoValidate = require('../validations/todo/createTodo.validate');
const deleteTodoValidate = require('../validations/todo/deleteTodo.validate');
const getTodoValidate = require('../validations/todo/getTodo.validate');
const updateTodoValidate = require('../validations/todo/updateTodo.validate');

const todoRouter = require('express').Router();

todoRouter.get('/', verifyToken, wrap(fetchAllTodos));

todoRouter.get('/:todoId', verifyToken, getTodoValidate(), validate, wrap(getTodo));

todoRouter.post('/', verifyToken, createTodoValidate(), validate, wrap(createTodo));

todoRouter.patch('/:todoId', verifyToken, updateTodoValidate(), validate, wrap(updateTodo));

todoRouter.delete('/:todoId', verifyToken, deleteTodoValidate(), validate, wrap(deleteTodo));

todoRouter.post('/:todoId', verifyToken, createTaskValidate(), validate, wrap(createSubTask));

todoRouter.patch('/:todoId/:taskId', verifyToken, updateTaskValidate(), validate, wrap(updateSubTask));

todoRouter.delete('/:todoId/:taskId', verifyToken, deleteTaskValidate(), validate, wrap(deleteSubTask));

module.exports = todoRouter;