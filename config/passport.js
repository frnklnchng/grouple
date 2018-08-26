const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (payload, done) => {
    User.findById(payload.id)
      .then( user => {
        if (user) {
          //return user to frontend
          return done(null, user);
        }
        //return false since no user
        return done(null, false);
      })
      .catch(err => console.log(err));
    // This payload includes the items we specified earlier
    // console.log(payload);
  }));
};