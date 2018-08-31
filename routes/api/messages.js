const express = require('express');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/message');

const router = express.Router();

//GET /api/messages
router.get('/', (request, response) => {
  Message.find({},  (err, messages) => {
    let msgMap = {};

    messages.forEach((msg) => {
      msgMap[msg._id] = msg;
    });

    response.send(msgMap);
  });
  // Message.find({}).sort({date: 'descending'}).exec((err, messages) => {
  //   let msgMap = {};
  //   messages.forEach((msg) => {
  //     msgMap[msg._id] = msg;
  //   });

  //   response.send(msgMap);
  // })
});

router.post('/post', (request, response) => {
    const { errors, isValid } = validateMessageInput(request.body);
    if (!isValid) return response.status(400).json(errors);

    const newMessage = new Message({
      // userId: "5b82fee8dc285b927df3e357",
      // subreddit: request.subreddit.id,
      text: request.body.text,
      userId: request.body.userId,
      subredditId: request.body.subredditId,
      date: request.body.date,
    });

    newMessage.save().then(message => {
      response.json(message);
    });
  }
);

module.exports = router;