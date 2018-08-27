import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import 'bootstrap/dist/css/bootstrap.css';


document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  // ReactDOM.render(<Root store={store} />, root);
  ReactDOM.render(<div>Hello world!</div>, root);
});
