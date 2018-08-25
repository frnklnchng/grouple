const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const database = require('./config/keys').mongoURI;

const port = process.env.PORT || 3000;

const app = express();
app.use('/api/users', users);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});