import React from 'react';
import io from "socket.io-client";
import ChatIndexContainer from './chatroom_index_container';
import GreetingContainer from '../greeting/greeting_container';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect();
    // this.createSortedMsgs();
    // this.socket = io.connect('http://localhost:3000');

    this.state = {
      subredditId: this.props.match.params.id,
      message: "",
      msgs: Array.from(this.props.msgs),
    };
    // debugger
    this.handleSend = this.handleSend.bind(this);
    this.chatOnEmit = this.chatOnEmit.bind(this);
    this.chatOnEmit();

  }
  
  componentDidMount() {
    this.props.fetchAllMessages();
    this.setState({msgs: this.props.msgs})
    // debugger
  }

  createSortedMsgs(nextPropsMsgs){
    let sortedMsgs = {};
    nextPropsMsgs.forEach((msg) => {
      if(!sortedMsgs[msg.subredditId]){
        sortedMsgs[msg.subredditId] = [];
      }
      sortedMsgs[msg.subredditId].push(msg);
    });
    return sortedMsgs;
  }


  
  componentWillReceiveProps(nextProps) {
    if(!Object.values(this.state.msgs).length){
      let sorted = this.createSortedMsgs(nextProps.msgs);
      this.setState({
        msgs: sorted,
      })
    }
    if((this.props.vistedChats === undefined)){
      this.props.patchChats({id: this.props.userId, visitedChats: []});
    }
    if(!(this.props.vistedChats === undefined)){
      if(!this.props.visitedChats.includes(nextProps.subredditId) && nextProps.subredditId != null){
        let updatedVisted = Array.from(this.props.visitedChats);
        updatedVisted.push(nextProps.subredditId);
  
        this.props.patchChats({id: this.props.currentUserId, visitedChats: updatedVisted});
      }

    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e) {
    e.preventDefault();
    //send to db
    this.props.postMessage({text: this.state.message, userId: this.props.currentUser, subredditId: this.props.subredditId, date: Date()})
    //set on local state
    //emit message with msg

    //set current user name to be the message
    
    this.socket.emit('chat message', {text: this.state.message, userId: this.props.currentUser});
    this.setState({ message: '' });
    return false;
  }
  
  chatOnEmit() {
    this.scrollToBottom(); 
    const that = this;
    this.socket.on('chat message', (msg) => {
      let msgs = Object.assign({}, that.state.msgs)
      if(!msgs[that.props.subredditId]){
        msgs[that.props.subredditId] = [];
      }
    
      msgs[that.props.subredditId].push(msg);
      
      that.setState({
        msgs: msgs, 
      });
      this.scrollToBottom() 

    });
  }

  renderPrevMsgs() {
    // return Object.values(this.props.msgs).map(msg => (<li className='msg'>{msg.text}</li>))
    // let messages = Object.values(this.props.msgs);
    if(!Object.values(this.state.msgs).length || !this.props.subredditId){
      return (<div> no msgs </div>)
    }
    let subredditId = this.props.subredditId;
    if(!this.state.msgs[subredditId]){
      return (<div>No messages!</div>)
    }
    let messages = Array.from(this.state.msgs[subredditId])
    // console.log(messages);
    if(!messages.length){
      return;
    }
    let result = [];
    let prevId = null;
    for(let i = 0; i < messages.length; i++){
      if(prevId != messages[i].userId){
        result.push(
        <li className='chat-user' key={`user-${prevId}-${i}`}>
          {/* <img className='chat-user-avatar' src="https://png.icons8.com/material/96/000000/user-male-circle.png"></img> */}
          <img className='chat-user-avatar' src="https://cdn1.iconfinder.com/data/icons/somacro___dpi_social_media_icons_by_vervex-dfjq/500/reddit.png"></img>
          <div className='chat-user-name'>{messages[i].userId}</div>
        </li>);
        prevId = messages[i].userId;
      }

      result.push(<li className='chat-msg' key={`message-${i}`}>{messages[i].text}</li>);
    }
    return result;
  }

  scrollToBottom() {
    let scrollDiv = document.getElementById("chatroom");
    if (scrollDiv) scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }
  
  render() {
    return (
      <div key='component'>
        <div className ='chat-index'>
          <ChatIndexContainer />
        </div>
      <div className="chat-component">
        <div className="greeting-header">
          <h1 className="chat-name">{"r/" + this.props.subredditId}</h1>
          <GreetingContainer /> 
        </div>
      <div className='chatroom' id='chatroom'>
          <ul id="messages">{ this.renderPrevMsgs() }</ul>
      </div>

          <form id='chat-form' onSubmit={this.handleSend}>
            <div className="chat-input-div">
            <input className='chat-input' id="m" placeholder={`Message ${"r/" + this.props.subredditId}`} autoComplete="off" onChange={this.update('message')} value={this.state.message} />
              <button className="chat-submit">Send</button>
            </div>
          </form>

      </div>
      </div>
    );
  }
}

export default Chatroom;