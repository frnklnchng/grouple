import React from 'react';

const MessageItem = ({ message }) => {
  const timestamp = message.date;
  const date = timestamp.slice(0, 10);
  const time = timestamp.slice(11, 16);
  return (
    <li className='chat-user'>
      <img className='chat-user-avatar' src="https://cdn1.iconfinder.com/data/icons/somacro___dpi_social_media_icons_by_vervex-dfjq/500/reddit.png" alt="stuff"></img>
      <div className='chat-user-name'>{message.userId}</div>
      <div className="chat-right">
        <div className="chat-date">{ date }</div>
        <div className="chat-time">{ time }</div>
      </div >
    </li>
  );
};

export default MessageItem;