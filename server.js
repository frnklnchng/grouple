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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api/users', users);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
let chatUsers = [];
let chatConnections = [];

console.log('server is running');
server.listen(process.env.PORT || 3000);
app.get('/', function(request, response){
  request.sendFile(__dirname + '/index.html')
});
