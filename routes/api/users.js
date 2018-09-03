const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');

// const keys = require('../../config/keys');
const User = require('../../models/User');
const validateLoginInput = require('../../validation/login');
const validateSignupInput = require('../../validation/signup');

const router = express.Router();

function userParams(formUser) {
  return {
    email: formUser.body.email,
    password: formUser.body.password,
    vistedChats: formUser.body.visitedChats,
  };
}

// GET /api/users/
router.get('/', (request, response) => {
  response.json({ msg: 'This is the users route' });
});

// GET /api/users/current
router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.json({ 
    id: request.user.id,
    email: request.user.email,
    vistedChats: request.user.vistedChats,
  });
});

// POST /api/users/signup
router.post("/signup", (req, res) => {
  
  const { errors, isValid } = validateSignupInput(req.body);
   
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, name: user.email };

              // jsonwebtoken.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              jsonwebtoken.sign(payload, process.env.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});



// POST /api/users/login
router.post('/login', (request, response) => {
  const { errors, isValid } = validateLoginInput(request.body);
  if (!isValid) return response.status(400).json(errors);
  
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      const errorMessage = { email: 'This user does not exist' };
      return response.status(404).json(errorMessage);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.email, visitedChats: user.visitedChats };
        jsonwebtoken.sign(
          payload,
          // keys.secretOrKey,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (_, token) => {
            response.json({
              success: true,
              token: `Bearer ${token}`,
            });
          });
      } else {
        const errorMessage = { password: 'Incorrect password' };
        return response.status(400).json(errorMessage);
      }
    });
  });
});

router.patch('/update_chats', (request, response) => {
  console.log(request.body);
  const visitedChats = request.body.visitedChats;
  const id = request.body.id;

  User.update(
    { _id: id },
    { visitedChats: visitedChats }
    ).exec();

  response.json({
    visitedChats,
  })

  
});


module.exports = router;