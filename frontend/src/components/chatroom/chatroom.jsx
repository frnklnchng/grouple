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
    this.chatOnEmit = this.chatOnEmit.bind(this);
    this.chatOnEmit();
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

  chatOnEmit(){
    console.log('ran it!');
    this.socket.on('chat message', function (msg) {
      console.log('ah, new message!!');
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
          <input id="m" autoComplete="off" onChange={this.update('message')}/>
          <button>Send</button>
        </form>
      </div>
    )
  }

}

export default Chatroom;