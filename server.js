const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup =  require('./config/passport');

const oauth = require('./routes/api/oauth');
const users = require('./routes/api/users');
const chats = require('./routes/api/chats');
const messages = require('./routes/api/messages');
const subreddits = require('./routes/api/subreddits');
const database = require('./config/keys').mongoURI;
passportSetup(passport);

mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo Bongo successfully'))
  .catch(error => console.log(error));
  
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api/oauth', oauth);
app.use('/api/users', users);
app.use('/api/messages', messages);
app.use('/api/subreddits', subreddits);

http.listen(process.env.PORT || 5000);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('chat message', function (message) {
    io.emit('chat message', message);
  });
});