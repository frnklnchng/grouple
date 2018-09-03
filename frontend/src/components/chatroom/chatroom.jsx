import React from 'react';
import io from "socket.io-client";
import GreetingContainer from '../greeting/greeting_container';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect(process.env.clientURL + 'chat');
    // this.socket = io.connect('http://localhost:3000');

    this.state = {
      message: "",
      msgs: Array.from(this.props.msgs),
    };
    this.handleSend = this.handleSend.bind(this);
    this.chatOnEmit = this.chatOnEmit.bind(this);
    this.chatOnEmit();
  }
  
  componentDidMount() {
    this.props.fetchAllMessages();
    this.setState({msgs: this.props.msgs});
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      msgs: nextProps.msgs
    });
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e){
    e.preventDefault();
    this.props.postMessage({text: this.state.message, userId: this.props.currentUser, subredditId: 1});
    this.socket.emit('chat message', {text: this.state.message, userId: this.props.currentUser});
    this.setState({
      message: ""
    });
    return false;
  }
  
  chatOnEmit(){
    this.scrollToBottom(); 
    const that = this;
    this.socket.on('chat message', (msg) => {
      let msgs = Array.from(that.state.msgs);
      msgs.push(msg);
      that.setState({msgs: msgs});
      this.scrollToBottom();
    });
  }

  renderPrevMsgs() {
    let messages = Array.from(this.state.msgs);
    if(!messages.length){
      return;
    }
    let result = [];
    let prevId = '';
    for(let i = 0; i < messages.length; i++){
      if(prevId !== messages[i].userId){
        result.push(
        <li className='chat-user' key={i}>
          <img className='chat-user-avatar' src="https://cdn1.iconfinder.com/data/icons/somacro___dpi_social_media_icons_by_vervex-dfjq/500/reddit.png"></img>
          <div className='chat-user-name'>{messages[i].userId}</div>
        </li>);
        prevId = messages[i].userId;
      }
      result.push(<li className='chat-msg' key={messages[i]._id} >{messages[i].text}</li>);
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
    return (
      <div className="chat-component">
        <div className="greeting-header">
          <h1 className="chat-name">r/Chatroom</h1>
          <GreetingContainer /> 
        </div>
        <div className='chatroom' id='chatroom'>
          <ul id="messages">
          { this.renderPrevMsgs() }
          </ul>
        </div>
          <form id='chat-form' onSubmit={this.handleSend}>
            <div className="chat-input-div">
            <input className='chat-input' id="m" placeholder={`Message ${"r/Chatroom"}`} autoComplete="off" onChange={this.update('message')} value={this.state.message} />
              <button className="chat-submit">Send</button>
            </div>
          </form>
      </div>
    );
  }
}

export default Chatroom;