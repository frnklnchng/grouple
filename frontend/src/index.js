import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/00-entry.css';
import jwt_decode from 'jwt-decode';
import Root from './components/Root';
import configureStore from './store/store';
import * as APIUtil from './util/session_api_util';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();
  if (localStorage.jwtToken) {
    APIUtil.setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(APIUtil.setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(APIUtil.logout());
      window.location.href = '/login';
    }
  }
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
  registerServiceWorker();
});