import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { fetchMessages, createMessage } from './actions/message_actions';
window.fetchMessages = fetchMessages;
window.createMessage = createMessage;

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;
  window.dispatch = store.dispatch;
  const rootElement = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, rootElement);
});