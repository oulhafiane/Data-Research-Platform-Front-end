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
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
import SharedNavbar from "./SharedNavbar";

import Axios from "axios";
import { DEFAULT_URL } from "../../config";

// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

class AuthNavbar extends React.Component {
  state = {
    user: {},
    photo_user: require("assets/img/theme/user-profile.png")
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //this.props.history.push("/");
  };

  checkUser = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null && token !== undefined) {
      const config = {
        headers: { Authorization: "bearer " + token }
      };
      Axios.get(`${DEFAULT_URL}api/current/infos`, config)
        .then(res => {
          if (res.data !== undefined) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.setState({ user: res.data });
          }
        })
        .catch(error => {
          console.log("Log out.");
          localStorage.removeItem("token");
          this.logout();
          console.log("Ok");
        });
    } else {
      this.setState({ user: user });
      if (user._photo) this.setState({ photo_user: user._photo.original });
    }
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    this.checkUser();
  }
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/argon-react-white.png")}
              />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar_global">
              <SharedNavbar />
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Navbar>
        </header>
      </>
    );
  }
}

export default AuthNavbar;
