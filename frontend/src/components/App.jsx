import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash/splash_container';
import GreetingContainer from './greeting/greeting_container';
import ChatroomContainer from './chatroom/chatroom_container.js';

const App = () => (
  <div>
    <Switch>
      <ProtectedRoute exact path="/chat" component={ChatroomContainer}/>
      <ProtectedRoute exact path="/chat/:id" component={ChatroomContainer}/>
      <ProtectedRoute exact path="/home" component={GreetingContainer} />
      <AuthRoute path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;