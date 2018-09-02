import React from 'react';
import io from "socket.io-client";
import MessageItem from './message_item';
import MessageItemSame from './message_item_same';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect();
    this.state = {
      message: '',
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
    this.setState({ msgs: nextProps.msgs });
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
    this.setState({ message: '' });
  }
  
  chatOnEmit(){
    this.scrollToBottom();
    //set onto local state
    const that = this;
    //check if new message is from same user, if not append label
    this.socket.on('chat message', (msg) => {
      let msgs = Array.from(that.state.msgs);
      msgs.push(msg);
      that.setState({msgs: msgs});
      this.scrollToBottom();
    });
  }

  renderPrevMsgs() {
    const result = [];
    let prevId = '';
    const messages = Array.from(this.state.msgs);
    if (!messages.length) return;
    messages.forEach(message => {
      if (prevId !== message.userId) {
        result.push(<MessageItem key={message._id} message={message} />);
        prevId = message.userId;
      } else {
        result.push(<MessageItemSame key={message._id} message={message} />);
      }
    });
    return result;
  }

  scrollToBottom(){
    const scrollDiv = document.getElementById("chatroom");
    if (scrollDiv) scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }

  render() {
    // debugger
    return (
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
    );
  }
}

export default Chatroom;