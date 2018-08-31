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
      msgs: Array.from(this.props.msgs),
    };
    this.handleSend = this.handleSend.bind(this);
    this.chatOnEmit = this.chatOnEmit.bind(this);
    this.chatOnEmit();
  }
  
  componentDidMount() {
    const that = this;
    this.props.fetchAllMessages();
    this.setState({msgs: this.props.msgs})
    
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      msgs: nextProps.msgs
    })
    // debugger
  }

  
  

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e){
    e.preventDefault();
    //send to db
    this.props.postMessage({text: this.state.message, userId: this.props.currentUser, subredditId: 1})
      // .then();
    // debugger
    //set on local state
    //emit message with msg

    //set current user name to be the message
    
    this.socket.emit('chat message', {text: this.state.message, userId: this.props.currentUser});
    // this.socket.emit('chat message', {message: this.state.message, username: this.props.currentUser});
    this.setState({
      message: ""
    });
    return false;
  }
  
  chatOnEmit(){
    this.scrollToBottom() 

    //set onto local state
    const that = this;
    //check if new message is from same user, if not append label
    this.socket.on('chat message', (msg) => {
      let msgs = Array.from(that.state.msgs)
      msgs.push(msg);
      that.setState({msgs: msgs});
      this.scrollToBottom() 

    });
    
  }

  renderPrevMsgs() {
    // return Object.values(this.props.msgs).map(msg => (<li className='msg'>{msg.text}</li>))
    // let messages = Object.values(this.props.msgs);
    let messages = Array.from(this.state.msgs)
    if(!messages.length){
      return;
    }
    let result = [];
    let prevId = '';
    for(let i = 0; i < messages.length; i++){
      if(prevId != messages[i].userId){
        result.push(<label className='username'>{messages[i].userId}</label>);
        prevId = messages[i].userId;
      }
      debugger 
      result.push(<li className='msg'>{messages[i].text}</li>);
    }
    return result;
  }

  scrollToBottom(){
    let scrollDiv = document.getElementById("chatroom");
    if(scrollDiv){
      scrollDiv.scrollTop = scrollDiv.scrollHeight; 
    }
  }

  
  render() {
    // debugger
    return (
      <div className="chat-component">
        <h1>Chatroom</h1>
        <div className='chatroom' id='chatroom'>
          <ul id="messages">
          { this.renderPrevMsgs() }
          </ul>
        </div>
          <form id='chat-form' onSubmit={this.handleSend}>
            <input id="m" autoComplete="off" onChange={this.update('message')} value={this.state.message} />
            <button>Send</button>
          </form>
      </div>
    )
  }
}

export default Chatroom;