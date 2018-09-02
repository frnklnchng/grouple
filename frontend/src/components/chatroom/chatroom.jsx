import React from 'react';
import { withRouter } from 'react-router-dom';
import io from "socket.io-client";
import ChatIndex from './chatroom_index';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.socket = io.connect();
    // this.createSortedMsgs();
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
    const that = this;
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
    // debugger
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if(prevProps.subredditId != this.props.subredditId){
  //     console.log('yo we needa switch');
  //     let that = this;
  //     let chatMsgs = []
  //     this.state.msgs.forEach((msg) => {
  //       if(msg.subredditId === that.props.subredditId){
  //         chatMsgs.push(msg);
  //       } 
  //     });
  //     this.setState({
  //       msgs: chatMsgs,
  //       subredditId: this.props.subredditId,
  //     });
  //     debugger
  //   }
  // }

  // onlyCurSubMsgs(){

  // }
  
  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   msgs: nextProps.msgs
    // })
    let sorted = this.createSortedMsgs(nextProps.msgs);
    this.setState({
      msgs: sorted,
    })
    // if(!this.state.msgs.length){
    //   let chatMsgs = []
    //   nextProps.msgs.forEach((msg) => {
    //     if (msg.subredditId === nextProps.subredditId) {
    //       chatMsgs.push(msg);
    //     }
    //   })
    //   this.setState({
    //     msgs: chatMsgs,
    //   });
    // }

    // else {
    //   if (nextProps.subredditId != this.props.subredditId) {
    //     console.log('yo we needa switch');
    //     let that = this;
    //     let chatMsgs = [];
    //     // debugger
    //     nextProps.msgs.forEach((msg) => {
    //       if (msg.subredditId === nextProps.subredditId) {
    //         chatMsgs.push(msg);
    //       }
    //     });
    //     this.setState({
    //       msgs: chatMsgs,
    //       subredditId: nextProps.subredditId,
    //     });

    //     // debugger
    //   }
    // }
  }

  
  

  update(field) {
    console.log(this.props.match.params)
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e){
    e.preventDefault();
    //send to db
    this.props.postMessage({text: this.state.message, userId: this.props.currentUser, subredditId: this.props.subredditId, date: Date()})
      // .then();
    // debugger
    //set on local state
    //emit message with msg
    // debugger
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
      let msgs = Object.assign({}, that.state.msgs)
      debugger
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
    // debugger
    if(!Object.values(this.state.msgs).length || !this.props.subredditId){
      return (<div> no msgs </div>)
    }
    let subredditId = this.props.subredditId;
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
        <li className='chat-user'>
          {/* <img className='chat-user-avatar' src="https://png.icons8.com/material/96/000000/user-male-circle.png"></img> */}
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
    if(scrollDiv){
      scrollDiv.scrollTop = scrollDiv.scrollHeight; 
    }
  }

  
  render() {
    // debugger
    return (
      <div>
        <div className ='chat-index'>
          <ChatIndex />
        </div>
        <div className="chat-component">
          <h1 className="chat-name">r/Chatroom</h1>
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
      </div>
    )
  }
}

export default Chatroom;