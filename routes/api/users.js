const axios = require('axios');
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const querystring = require('querystring');
const jsonwebtoken = require('jsonwebtoken');

const keys = require('../../config/keys');
const User = require('../../models/User');
const validateLoginInput = require('../../validation/login');
const validateSignupInput = require('../../validation/signup');

const router = express.Router();

function userParams(formUser) {
  return {
    email: formUser.body.email,
    password: formUser.body.password
  };
}

// GET /api/users/
router.get('/', (request, response) => {
  response.json({ msg: 'hello' });
});

// GET /api/users/current
router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.json({ 
    id: request.user.id,
    email: request.user.email
  });
});

// POST /api/users/signup
router.post('/signup', (request, response) => {
  const { errors, isValid } = validateSignupInput(request.body);
  if (!isValid) return response.status(400).json(errors);

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

// POST /api/users/login
// router.post('/login', (request, response) => {
//   const { errors, isValid } = validateLoginInput(request.body);
//   if (!isValid) return response.status(400).json(errors);
  
//   const email = request.body.email;
//   const password = request.body.password;

//   User.findOne({ email }).then(user => {
//     if (!user) {
//       const errorMessage = { email: 'This user does not exist' };
//       return response.status(404).json(errorMessage);
//     }

//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         const payload = { id: user.id, name: user.email };
//         jsonwebtoken.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: 3600 },
//           (_, token) => {
//             response.json({
//               success: true,
//               token: `Bearer ${token}`
//             });
//           });
//       } else {
//         const errorMessage = { password: 'Incorrect password' };
//         return response.status(400).json(errorMessage);
//       }
//     });
//   });
// });


// POST /api/users/login
router.post('/login', (request, response) => {
  const data = request.body.data;
  const payload = { id: 1, name: 'user.email' };
  console.log('aaaaa1');
  jsonwebtoken.sign(
    payload,
    keys.secretOrKey,
    { expiresIn: data.expires_in },
    () => {
      console.log('aaaaa2');
      return response.json({
        success: true,
        token: `Bearer ${data.access_token}`
      });
    });
  console.log('aaaaa3');
});

module.exports = router;