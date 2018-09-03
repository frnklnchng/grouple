const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const passportSetup =  require('./config/passport');

const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const database = require('./config/keys').mongoURI;
passportSetup(passport);

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(error => console.log(error));
  
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api/users', users);
app.use('/api/messages', messages);

const server = http.Server(app);
server.listen(process.env.PORT || 5000);

const io = socketio(server);
io.on('connection', function(socket) {
  socket.broadcast.emit('welcome');
  socket.on('chat message', function(message) {
    io.emit('chat message', message);
  });
});