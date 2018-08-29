import React from 'react';
import { withRouter } from 'react-router-dom';
import io from "socket.io-client";

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect();
    this.state = {
      message: ""
    };
    this.handleSend = this.handleSend.bind(this);

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e){
    e.preventDefault();
    this.socket.emit('chat message', document.getElementById('m').value);
    document.getElementById('m').value = '';
    return false;
  }

  chatUpdate(){
    this.socket.on('chat message', function (msg) {
      let chatElem = document.createElement("li");
      chatElem.append(msg);
      document.getElementById('messages')
        .append(chatElem);
    });
  }

  
  render() {
    return (
      <div>
        <h1>Chatroom</h1>
        <ul id="messages"></ul>
        <form id='chat-form' onSubmit={this.handleSend}>
          <input id="m" autocomplete="off" />
          <button>Send</button>
        </form>
      </div>
    )
  }

}

export default Chatroom;