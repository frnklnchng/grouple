import React from 'react';
import { withRouter } from 'react-router-dom';

class Chatroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSend(e){
    e.preventDefault();
  }

  render() {
    return (<h1>Chatroom</h1>)
  }

}

export default Chatroom;