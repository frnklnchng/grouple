const axios = require('axios');
const express = require('express');
const keys = require('../../config/keys');
const querystring = require('querystring');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();

router.get('/', (request, response) => {
  const url = 'https://www.reddit.com/api/v1/access_token';
  const data = querystring.stringify({
    code: response.req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:5000/api/oauth'
  });
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic c21VXzFLbERFX0s1RUE6Y3ZLVTd4cDNKMV8tazVvWm43Q0FEdUJzZERB'
    }
  };

  axios
    .post(url, data, config)
    .then(res => {
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;
      const configs = { headers: { Authorization: `bearer ${accessToken}` } };
      axios
        .get('https://oauth.reddit.com/subreddits/popular', {}, configs)
        .then(a => console.log(a));
    });
});

module.exports = router;