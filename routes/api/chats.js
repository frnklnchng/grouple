const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (request, response) => {
  response.sendFile(__dirname + '/chat.html');
});

module.exports = router;