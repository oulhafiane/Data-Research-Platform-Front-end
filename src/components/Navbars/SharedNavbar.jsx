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
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavItem,
  NavLink,
  Nav,
  Row,
  Col
} from "reactstrap";

class SharedNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  render() {
    return (
      <>
        <div className="navbar-collapse-header">
          <Row>
            <Col className="collapse-brand" xs="6">
              <Link to="/">
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react.png")}
                />
              </Link>
            </Col>
            <Col className="collapse-close" xs="6">
              <button className="navbar-toggler" id="navbar_global">
                <span />
                <span />
              </button>
            </Col>
          </Row>
        </div>
        <Nav className="navbar-nav-hover align-items-lg-center" navbar>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <i className="ni ni-chart-bar-32" />
              <span className="nav-link-inner--text">Data</span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-xl">
              <div className="dropdown-menu-inner">
                <Media
                  className="d-flex align-items-center"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                  target="_blank"
                >
                  <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                    <i className="ni ni-spaceship" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">
                      Getting started
                    </h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Learn how to use Argon compiling Scss, change brand colors
                      and more.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                  target="_blank"
                >
                  <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    <i className="ni ni-palette" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">Foundation</h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Learn more about colors, typography, icons and the grid
                      system we used for Argon.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                  target="_blank"
                >
                  <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                    <i className="ni ni-ui-04" />
                  </div>
                  <Media body className="ml-3">
                    <h5 className="heading text-warning mb-md-1">Components</h5>
                    <p className="description d-none d-md-inline-block mb-0">
                      Browse our 50 beautiful handcrafted components offered in
                      the Free version.
                    </p>
                  </Media>
                </Media>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <i className="ni ni-single-copy-04" />
              <span className="nav-link-inner--text">Research</span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-xl">
              <div className="dropdown-menu-inner">
                <Media
                  className="d-flex align-items-center"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                  target="_blank"
                >
                  <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                    <i className="ni ni-spaceship" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">
                      Getting started
                    </h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Learn how to use Argon compiling Scss, change brand colors
                      and more.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                  target="_blank"
                >
                  <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    <i className="ni ni-palette" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">Foundation</h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Learn more about colors, typography, icons and the grid
                      system we used for Argon.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                  target="_blank"
                >
                  <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                    <i className="ni ni-ui-04" />
                  </div>
                  <Media body className="ml-3">
                    <h5 className="heading text-warning mb-md-1">Components</h5>
                    <p className="description d-none d-md-inline-block mb-0">
                      Browse our 50 beautiful handcrafted components offered in
                      the Free version.
                    </p>
                  </Media>
                </Media>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </>
    );
  }
}

export default SharedNavbar;
