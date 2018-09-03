const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');
const keys = require('./keys');

const options = {};
options.secretOrKey = keys.secretOrKey;
// options.secretOrKey = process.env.secretOrKey;
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

const passportSetup = (passport) => {
  passport.use(new JwtStrategy(options, (payload, done) => {
    User.findById(payload.id).then(user => {
      if (user) return done(null, user);
      return done(null, false);
    }).catch(error => console.log(error));
  }));
};

module.exports = passportSetup;