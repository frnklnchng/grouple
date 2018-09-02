import React from 'react';
import io from "socket.io-client";
import NavbarContainer from '../navbar/navbar_container';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect();

    this.state = {
      message: '',
      messages: Array.from(this.props.messages)
    };

    this.handleSend = this.handleSend.bind(this);
    this.chatOnEmit = this.chatOnEmit.bind(this);
    this.chatOnEmit();
  }
  
  componentDidMount() {
    this.props.fetchAllMessages();
    this.setState({ messages: this.props.messages });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages
    });
  }

  update(field) {
    return event => this.setState({
      [field]: event.currentTarget.value
    });
  }

  handleSend(event){
    event.preventDefault();
    this.props.postMessage({
      text: this.state.message,
      userId: this.props.currentUser,
      subredditId: 1
    });

    this.socket.emit('chat message', {
      text: this.state.message,
      userId: this.props.currentUser
    });

    this.setState({
      message: ''
    });
    return false;
  }
  
  chatOnEmit(){
    this.scrollToBottom() ;
    const that = this;
    this.socket.on('chat message', (message) => {
      let messages = Array.from(that.state.messages);
      messages.push(message);
      that.setState({messages: messages});
      this.scrollToBottom();
    });
  }

  renderPrevMsgs() {
    let messages = Array.from(this.state.messages);
    if (!messages.length) return;
    let result = [];
    let prevId = '';
    for (let i = 0; i < messages.length; i++){
      if (prevId !== messages[i].userId){
        result.push(
        <li className='chat-user'>
          <img className='chat-user-avatar' src="https://cdn1.iconfinder.com/data/icons/somacro___dpi_social_media_icons_by_vervex-dfjq/500/reddit.png"></img>
          <div className='chat-user-name'>{messages[i].userId}</div>
        </li>);
        prevId = messages[i].userId;
      }
      result.push(<li className='chat-msg'>{messages[i].text}</li>);
    }
    return result;
  }

  scrollToBottom(){
    let scrollDiv = document.getElementById("chatroom");
    if (scrollDiv) scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  sortMessages() {
    console.log(this.props.messages);
  }

  render() {
    return (
      <div id="messenger">
        <NavbarContainer />
        <div className="chat-component">
          <h1 className="chat-name">r/Chatroom</h1>
          <div className='chatroom' id='chatroom'>
            <ul id="messages">{ this.renderPrevMsgs() }</ul>
          </div>
            <form id='chat-form' onSubmit={this.handleSend}>
              <div className="chat-input-div">
              <input className='chat-input' id="m" placeholder={`Message ${"r/Chatroom"}`} autoComplete="off" onChange={this.update('message')} value={this.state.message} />
                <button className="chat-submit">Send</button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

export default Chatroom;