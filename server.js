const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup =  require('./config/passport');

const users = require('./routes/api/users');
const database = require('./config/keys').mongoURI;
const port = process.env.PORT || 3000;
passportSetup(passport);

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));

  const app = express();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', function(socket){
    console.log('a user connected');
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use('/api/users', users);
// app.use('/api/users', users);



http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

