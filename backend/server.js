const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const database = require('./config/keys').mongoURI;
const passportSetup = require('./config/passport');
passportSetup(passport);

const users = require('./routes/api/users');
const messages = require('./routes/api/messages');

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static('frontend'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/users', users);
app.use('/api/messages', messages);

const server = app.listen(process.env.PORT || 3000);