import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SplashContainer from './splash/splash_container';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
// import SignUpFormContainer from './session_form/signup_form_container';
import ChatroomContainer from './chatroom/chatroom_container.js';

const App = () => (
  <div>
    <header>
      {/* <Link to="/" className="header-link"><h1>Grouple</h1></Link> */}
    </header>
    <Switch>
      <Route exact path="/chat" component={ChatroomContainer}/>
      {/* <AuthRoute exact path="/login" component={SessionFormContainer} /> */}
      {/* <AuthRoute exact path="/signup" component={SessionFormContainer} /> */}
      <ProtectedRoute exact path="/home" component={GreetingContainer} />
      <AuthRoute path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;