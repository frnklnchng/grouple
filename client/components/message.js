window.socket = window.io.connect('http://localhost:3000');

window.socket.on('connection', function () {
  const messageElement = document.getElementById('message-box');
  const message = messageElement.value;
  window.socket.emit(message);
});