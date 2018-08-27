const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportSetup =  require('./config/passport');

const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const database = require('./config/keys').mongoURI;
const port = process.env.PORT || 3000;
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
app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

const io = socket(server);
io.sockets.on('connection', (socketInstance) => {
  socketInstance.emit('connection');
  socketInstance.on
});