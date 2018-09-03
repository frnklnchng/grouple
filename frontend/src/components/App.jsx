import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';

import SplashContainer from './splash/splash_container';
import GreetingContainer from './greeting/greeting_container';
import ChatroomContainer from './chatroom/chatroom_container';

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute path="/chat" component={ChatroomContainer}/>
      <ProtectedRoute path="/home" component={GreetingContainer} />
      <Route exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;