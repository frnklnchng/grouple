const express = require('express');
const snoowrap = require('snoowrap');
const keys = require('../../config/keys');
const router = express.Router();

// const snoo = new snoowrap({
//   userAgent: keys.redditAPI.userAgent,
//   clientId: keys.redditAPI.clientId,
//   clientSecret: keys.redditAPI.clientSecret,
//   refreshToken: keys.redditAPI.refreshToken
// });

// GET /api/subreddits
router.get('/', (request, response) => {
});

module.exports = router;