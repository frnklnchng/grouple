import React from 'react';
import io from "socket.io-client";
import NavbarContainer from '../navbar/navbar_container';

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io.connect();
    this.state = {
      text: '',
      userId: this.props.currentUser,
      subredditId: 1
    };
    this.handleSend = this.handleSend.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllMessages();
  }

  sortMessages(messages) {
    return messages;
  }

  handleInput(event) {
    this.setState({ text: event.currentTarget.value });
  }

  handleSend(event) {
    event.preventDefault();
    this.props.postMessage(this.state);
    this.setState({ text: '' });
  }

  getMessages() {
    let previousUserId;
    return this.sortMessages(this.props.messages).map(message => {
      if (previousUserId !== message.userId) {
        previousUserId = message.userId;
        return (
          <li className='chat-user'>
            <img className='chat-user-avatar' src="https://cdn1.iconfinder.com/data/icons/somacro___dpi_social_media_icons_by_vervex-dfjq/500/reddit.png"></img>
            <div className='chat-user-name'>{ message.userId} </div>
          </li>
          );
      } else {
        return <li className='chat-msg'>{ message.text }</li>;
      }
    });
  }

  scrollToBottom() {
    let scrollDiv = document.getElementById("chatroom");
    if (scrollDiv) scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  render() {
    if (this.props.messages.length === 0) return null;
    return (
      <div id="messenger">
        <NavbarContainer />
        <div className="chat-component">
          <h1 className="chat-name">r/Chatroom</h1>
          <div className='chatroom' id='chatroom'>
            <ul id="messages">{ this.getMessages() }</ul>
          </div>
          <form id='chat-form' onSubmit={this.handleSend}>
            <div className="chat-input-div">
              <input className='chat-input' id="m" placeholder={`Message ${"r/Chatroom"}`} autoComplete="off" onChange={ this.handleInput } value={ this.state.text } />
              <button className="chat-submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chatroom;