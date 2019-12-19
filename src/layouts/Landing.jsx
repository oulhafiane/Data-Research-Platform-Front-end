/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { Route, Switch } from "react-router-dom";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar";
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import DefaultFooter from "components/Footers/AuthFooter.jsx";

import routes from "routes.js";
import Carousels from "components/Carousels/Carousels";
import authService from "../services/auth-service";

class Landing extends React.Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    authService.isAuthenticated().then(good => {
      this.setState({ isAuthenticated: good });
    });
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/landing") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        {this.state.isAuthenticated ? (
          <DefaultNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
        ) : (
          <AuthNavbar />
        )}
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <Carousels />
            {/* 1st Hero Variation */}
          </div>
          <Switch>{this.getRoutes(routes)}</Switch>
          <DefaultFooter />
        </main>
      </>
    );
  }
}

export default Landing;
