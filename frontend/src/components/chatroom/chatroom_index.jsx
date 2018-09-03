import React from 'react';
import { withRouter } from 'react-router-dom';
// import ChatroomIndexItem from './chatroom_index_item';
// import ChatroomContainer from './chatroom_container';
import { Link } from 'react-router-dom'


class ChatIndex extends React.Component {
  constructor(props) {
    super(props);
    // debugger
  } 


  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    
  }


  render() {
    const renderVisited = () => { 
      return this.props.visitedChats.map((chat, index) => (
      <li key={`chatroom-${index}`}> <Link to={`/chat/${chat}`}>{`/r/${chat}`}</Link> </li>
        ) 
      )
    }
    return (
      <div>
        <ul>
          <li> <Link to="/chat/global">r/global</Link> </li>
          <li> <Link to="/chat/Programers">r/programers</Link> </li>
          <li> <Link to="/chat/appacademy">/r/appacademy</Link> </li>
          <div>
            Visited: 
          </div>
          { renderVisited() }
        </ul>

      </div>

    )
  }
  
}
export default ChatIndex;
