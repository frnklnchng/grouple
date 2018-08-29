import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import GreetingContainer from './greeting/greeting_container';
import ChatroomContainer from './chatroom/chatroom_container.js';
import LogInFormContainer from './session_form/login_form_container';
import SignUpFormContainer from './session_form/signup_form_container';

const App = () => (
  <div>
    <header>
      <Link to="/" className="header-link"><h1>Grouple</h1></Link>
    </header>
    <Switch>
      <Route exact path="/chat" component={ChatroomContainer}/>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <ProtectedRoute exact path="/" component={GreetingContainer} />
    </Switch>
  </div>
);

export default App;