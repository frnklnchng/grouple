const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const database = require('./config/keys').mongoURI;
const port = process.env.PORT || 3000;

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api/users', users);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (request, response) => {
  response.send('Hello World!');
});