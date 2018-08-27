const express = require('express');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/message');

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (request, response) => {
    const { errors, isValid } = validateMessageInput(request.body);
    if (!isValid) return response.status(400).json(errors);

    const newMessage = new Message({
      userId: "5b82fee8dc285b927df3e357",
      // subreddit: request.subreddit.id,
      text: request.body.text,
    });

    newMessage.save().then(message => {
      response.json(message);
    });
  }
);

module.exports = router;