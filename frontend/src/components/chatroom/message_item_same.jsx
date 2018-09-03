import React from 'react';

const MessageItemSame = ({ message }) => {
  return <li className='chat-msg'>{message.text}</li>;
};

export default MessageItemSame;