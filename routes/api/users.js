const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const keys = require('../../config/keys');
const User = require('../../models/User');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();

function userParams(formUser) {
  return {
    email: formUser.body.email,
    password: formUser.body.password
  };
}

router.get('/', (request, response) => {
  response.json({ msg: 'This is the users route' });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.json({ msg: 'Success' });
})

router.post('/signup', (request, response) => {
  User.findOne({ email: request.body.email }).then(user => {
    if (user) {
      const errorMessage = { email: "A user has already registered with this address" };
      return response.status(400).json(errorMessage);

    } else {
      const newUser = new User(userParams(request));
      bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {

          if (error) throw error;
          newUser.password = hash;
          newUser.save()
            .then(dbUser => response.json(dbUser))
            .catch(dbError => console.log(dbError));
        });
      });
    }
  });
});

router.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      const errorMessage = { email: 'This user does not exist' };
      return response.status(404).json(errorMessage);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.email };
        jsonwebtoken.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (_, token) => {
            response.json({
              success: true,
              token: `Bearer ${token}`
            });
          });
      } else {
        return response.status(400).json({ password: 'Incorrect password' });
      }
    });
  });
});

module.exports = router;