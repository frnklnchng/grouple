import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

const App = () => (
  <div>
    <header>
      {/* <GreetingContainer /> */}
    </header>

    <Switch>
      {/* <AuthRoute exact path="/login" component={SessionFormContainer} />
      <AuthRoute exact path="/signup" component={SessionFormContainer} /> */}
      {/* <ProtectedRoute path="/upload" component={UploadFormContainer} />
      <ProtectedRoute path="/photos/:photoId" component={PhotoShowContainer} />
      <ProtectedRoute path="/home" component={PhotoIndexContainer} />
      <AuthRoute path="/" component={SplashContainer} /> */}
    </Switch>
  </div>
);

export default App;