const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
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

router.post('/register', (request, response) => {
  User
    .findOne({ email: request.body.email })
    .then(user => {
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

module.exports = router;