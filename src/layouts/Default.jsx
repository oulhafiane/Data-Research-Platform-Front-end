/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";
// core components
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import DefaultNavbar from "components/Navbars/DefaultNavbar.jsx";
import DefaultFooter from "components/Footers/AuthFooter.jsx";
import Header from "components/Headers/Header.jsx";
import routes from "routes.js";
import ProtectedRoute from "services/ProtectedRoute";
import authService from "../services/auth-service";

class Default extends React.Component {
  state = {
    isAuthenticated: false
  };

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  componentDidMount() {
    authService.isAuthenticated().then(good => {
      this.setState({ isAuthenticated: good });
    });
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/default") {
        if (prop.role === "ROLE_ANON") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return (
            <ProtectedRoute
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
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
        <div className="main-content" ref="mainContent">
          {this.state.isAuthenticated ? (
            <DefaultNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
            />
          ) : (
              <AuthNavbar />
            )}

          <Header />
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
          <Container className="mt-7"></Container>
          <DefaultFooter />
        </div>
      </>
    );
  }
}

export default Default;
