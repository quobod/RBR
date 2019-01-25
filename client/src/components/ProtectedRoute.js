import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../AppContext';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Consumer>
    {({ token }) => (
        <Route
        render={
          props =>
            token 
            ? <Component {...props} /> 
            : <Redirect to="/signin" />
        }
        {...rest}
        />
    )}
  </Consumer>
);

export default ProtectedRoute;