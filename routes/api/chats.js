const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const keys = require('../../config/keys');

const router = express.Router();

router.get('/chat', (request, response) => {
  response.json({
    msg: 'This is the chat route'
  });
});
module.exports = router;