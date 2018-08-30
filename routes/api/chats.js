const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (request, response) => {
  response.json({message: 'This is chat path'});
});

module.exports = router;