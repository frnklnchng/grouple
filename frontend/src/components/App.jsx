import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import SplashContainer from './splash/splash_container';
import GreetingContainer from './greeting/greeting_container';
import ChatroomContainer from './chatroom/chatroom_container.js';
import SessionFormContainer from './session_form/session_form_container';

const App = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/chat" component={ChatroomContainer}/>
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <Route path="/home" component={GreetingContainer} />
        <Route exact path="/" component={SplashContainer} />
      </Switch>
    </div>
  );
};

export default App;