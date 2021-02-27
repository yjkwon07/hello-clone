import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const SignUp = loadable(() => import('@pages/SignUp'));

export default function App(): JSX.Element {
  return (
    <Switch>
      <Redirect exact path="/" to="/signup" />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}
