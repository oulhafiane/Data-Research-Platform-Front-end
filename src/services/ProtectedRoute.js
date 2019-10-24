import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "./auth-service";

function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/auth/login" }} />
        )
      }
    />
  );
}

export default ProtectedRoute;
