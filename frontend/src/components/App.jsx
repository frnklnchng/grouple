import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';

import SplashContainer from './splash/splash_container';
import GreetingContainer from './greeting/greeting_container';
import MessengerContainer from './chatroom/messenger_container.js';

const App = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/chat" component={MessengerContainer}/>
        <ProtectedRoute path="/home" component={GreetingContainer} />
        <Route path="/" component={SplashContainer} />
      </Switch>
    </div>
  );
};

export default App;