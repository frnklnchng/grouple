import React from 'react';
import { withRouter } from 'react-router-dom';
import io from "socket.io-client";
import axios from 'axios';


class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect();
    this.state = {
      message: "",
      msgs: {},
    };
    this.handleSend = this.handleSend.bind(this);
    this.chatOnEmit = this.chatOnEmit.bind(this);
    this.chatOnEmit();
    // debugger
  }
  componentDidMount() {
    this.props.fetchAllMessages().then((response) => this.setState({msgs: response}));
    // debugger
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
    this.socket.on('chat message', function (msg) {
      let chatElem = document.createElement("li");
      chatElem.append(msg);
      document.getElementById('messages')
        .append(chatElem);
    });
  }

  renderPrevMsgs() {
    return Object.values(this.props.msgs).map(msg => (<li className='msg'>{msg.text}</li>))
  }

  
  render() {
    // debugger
    return (
      <div>
        <h1>Chatroom</h1>
        <ul id="messages">
        { this.renderPrevMsgs() }
        </ul>
        <form id='chat-form' onSubmit={this.handleSend}>
          <input id="m" autoComplete="off" onChange={this.update('message')}/>
          <button>Send</button>
        </form>
      </div>
    )
  }

}

export default Chatroom;