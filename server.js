const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup =  require('./config/passport');

const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const database = process.env.mongoURI;
// const database = require('./config/keys').mongoURI;
passportSetup(passport);

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));
  
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/messages', messages);

http.listen(process.env.PORT || 5000);

io.on('connection', function (socket) {
  socket.broadcast.emit('welcome');
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});