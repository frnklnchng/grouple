import React from 'react';

class Messenger extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.fetchMessages();
  }

  render() {
    const messages = this.props.messages.map(message => {
      return <li key={message.id} className="message">message.text</li>;
    });

    return (
      <ul className="messages">{ messages }</ul>
    );
  }
}

export default Messenger;