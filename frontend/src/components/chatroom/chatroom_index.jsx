import React from 'react';
import { withRouter } from 'react-router-dom';
// import ChatroomIndexItem from './chatroom_index_item';
// import ChatroomContainer from './chatroom_container';
import { Link } from 'react-router-dom'


class ChatIndex extends React.Component {
  constructor(props) {
    super(props);

  } 


  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    
  }


  render() {
    return (
      <div>
        <ul>
          <li> <Link to="/chat/1">ChatID1</Link> </li>
          <li> <Link to="/chat/2">ChatID2</Link> </li>
          <li></li>
        </ul>

      </div>

    )
  }
  
}
export default ChatIndex;
