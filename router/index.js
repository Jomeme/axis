const authRouter = require('./auth.router');
const todoRouter = require('./todo.router');
const uploadRouter = require('./upload.router');

const router = require('express').Router();

// For authentication routes.
router.use('/auth', authRouter);

// For todo routes
router.use('/todos', todoRouter);

// For picture uploads
router.use('/pictures', uploadRouter);

module.exports = router;