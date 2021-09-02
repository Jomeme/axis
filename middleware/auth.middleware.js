const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../database/models/user.model');

passport.use('registration', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true }, async (req, username, password, done) => {
  try {
    const user = await User.create({ username, password });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use('login', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true }, async (req, username, password, done) => {
  try {
    const user = await User.findOne({ where: { username }});

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate = await user.isPasswordValid(password);

    if (!validate) {
      return done(null, false, { message: 'Wrong password' });
    }

    return done(null, user, { message: 'Logged in successfully' });
  } catch (error) {
    return done(error, null, {});
  }
}));

passport.use(new JWTStrategy({ secretOrKey: process.env.JWT_SECRET, jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() }, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
}));
