const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (request, response) => {
  console.log('chat path');
});

module.exports = router;