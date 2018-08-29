import React from 'react';
import MessageIndexItem from './message_index_item';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const messages = this.props.messages.map(message => {
      return <MessageIndexItem key={message.id} message={message} />;
    });

    return (
      <div>
        <ul id="messages">{ messages }</ul>
        <input id="message-input" autoComplete="off" />
        <button>Send</button>
      </div>
    );
  }
}

export default Messenger;