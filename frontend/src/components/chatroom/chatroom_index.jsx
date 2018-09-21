import React from 'react';
import { withRouter } from 'react-router-dom';
// import ChatroomIndexItem from './chatroom_index_item';
// import ChatroomContainer from './chatroom_container';
import { Link } from 'react-router-dom'


class ChatIndex extends React.Component {
  constructor(props) {
    super(props);
    // debugger
    this.removeChat = this.removeChat.bind(this);
  } 

  componentDidMount(){
    this.props.receiveChats(this.props.id);
  }
  
  removeChat(index){
    //remove index item from list and run patch\
    console.log(this.props.visitedChats[index]);
    let nextChats = Array.from(this.props.visitedChats);
    nextChats.splice(index, 1);
    console.log(nextChats);
    this.props.updateChats({id: this.props.id, visitedChats: nextChats})
    this.props.receiveChats(this.props.id);
  }
  
  render() {
    const renderVisited = () => { 
      if(!this.props.visitedChats){
        return <li></li>
      }
      return this.props.visitedChats.map((chat, index) => (
        <li className='chat-link' key={`${index}`}>
          <Link className='a-link' to={`/chat/${chat}`}>{`/r/${chat}`}</Link> 
          <label onClick={() => this.removeChat(index)} className='hidden clickable remove'>x</label>
        </li>
        ) 
      )
    }
    return (
      <div>
        <div className='chatrooms-header'>Chatrooms</div>
        <div className='chat-category'>Main</div>
        <ul className='chatrooms'>
          <li className='chat-link'> <Link to="/chat/global">r/global</Link> </li>
          <li className='chat-link'> <Link to="/chat/Programers">r/programers</Link> </li>
          <li className='chat-link'> <Link to="/chat/appacademy">/r/appacademy</Link> </li>
        </ul>
          <div className='chat-category'>
            Visited
          </div>
        <ul className='chatrooms'>
          { renderVisited() }
        </ul>

      </div>

    )
  }
  
}
export default ChatIndex;