import React from 'react';
import { Route } from 'react-router-dom';
import MessengerContainer from './message/messenger_container';

const App = () => {
  return (
    <div id="app">
      <Route path='/messenger' component={MessengerContainer} />
    </div>
  );
};

export default App;