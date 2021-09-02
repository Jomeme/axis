const { validate } = require('../validations');
const passport = require('passport');
const wrap = require('../utils/wrap');
const register = require('../controllers/auth/register');
const login = require('../controllers/auth/login');
const registerValidate = require('../validations/auth/register.validate');
const loginValidate = require('../validations/auth/login.validate');

const authRouter = require('express').Router();

authRouter.post('/register', registerValidate(), validate, passport.authenticate('registration', { session: false }), wrap(register));

authRouter.post('/login', loginValidate(), validate, wrap(login));

module.exports = authRouter;