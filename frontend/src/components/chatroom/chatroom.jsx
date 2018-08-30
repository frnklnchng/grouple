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
  }

  componentDidMount() {
    this.props.fetchAllMessages().then((response) => this.setState({msgs: response}));
  }
  

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e){
    e.preventDefault();
    //send to db
    //set on local state
    //emit message with msg
    
    this.socket.emit('chat message', this.state.message);
    this.setState({
      message: ""
    });
    return false;
  }
  
  chatOnEmit(){
    //set onto local state
    //check if new message is from same user, if not append label
    this.socket.on('chat message', (msg) => {
      let chatElem = document.createElement("li");
      chatElem.append(msg);
      document.getElementById('messages').append(chatElem);
      document.getElementById('messages').className = 'msg';
      
    });
  }

  renderPrevMsgs() {
    // return Object.values(this.props.msgs).map(msg => (<li className='msg'>{msg.text}</li>))
    let messages = Object.values(this.props.msgs);
    let result = [];
    let prevId = '';
    for(let i = 0; i < messages.length; i++){
      if(prevId != messages[i].userId){
        result.push(<label className='username'>{messages[i].userId}</label>);
        prevId = messages[i].userId;
      }

      result.push(<li className='msg'>{messages[i].text}</li>);
    }
    return result;
  }

  
  render() {
    return (
      <div>
        <h1>Chatroom</h1>
        <ul id="messages">
        { this.renderPrevMsgs() }
        </ul>
        <form id='chat-form' onSubmit={this.handleSend}>
          <input id="m" autoComplete="off" onChange={this.update('message')} value={this.state.message} />
          <button>Send</button>
        </form>
      </div>
    )
  }

}

export default Chatroom;