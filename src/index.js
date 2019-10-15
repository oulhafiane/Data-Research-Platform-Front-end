import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import Default from "layouts/Default";
import Landing from "layouts/Landing";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/shards-dashboards.1.1.0.min.css";
import "assets/scss/argon-design-system-react.scss";
import "assets/vendor/font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/default" render={props => <Default {...props} />} />
      <Route path="/landing" render={props => <Landing {...props} />} />
      <Redirect from="/" to="/landing/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
