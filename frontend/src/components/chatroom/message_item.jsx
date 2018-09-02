import React from 'react';

const MessageItem = ({ message }) => {
  return (
    <li className='chat-user'>
      <img className='chat-user-avatar' src="https://cdn1.iconfinder.com/data/icons/somacro___dpi_social_media_icons_by_vervex-dfjq/500/reddit.png" alt="stuff"></img>
      <div className='chat-user-name'>{message.userId}</div>
    </li>
  );
};

export default MessageItem;