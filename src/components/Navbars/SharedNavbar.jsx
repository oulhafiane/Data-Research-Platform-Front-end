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
          <NavItem>
            <NavLink href="/landing/index#about-us">
              <i className="ni ni-briefcase-24" />
              About Us <span className="sr-only">(current)</span>
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <i className="ni ni-single-copy-04" />
              <span className="nav-link-inner--text">Impactree</span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-xl">
              <div className="dropdown-menu-inner">
                <Media
                  className="d-flex align-items-center"
                  href="/default/posts"
                >
                  <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                    <i className="ni ni-building" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">
                      Explore Problematics
                    </h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Learn how to use Argon compiling Scss, change brand colors
                      and more.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="/default/data"
                >
                  <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                    <i className="ni ni-chart-bar-32" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">
                      Explore Data
                    </h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Provides a listing of available datasets, including
                      databases, pre-formatted tables, reports, and other
                      resources.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="/landing/index#research"
                >
                  <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    <i className="ni ni-briefcase-24" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">
                      More about problematics
                    </h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      A research problem is a statement about an area of
                      concern.
                    </p>
                  </Media>
                </Media>
                <Media
                  className="d-flex align-items-center"
                  href="/landing/index#data"
                >
                  <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                    <i className="ni ni-briefcase-24" />
                  </div>
                  <Media body className="ml-3">
                    <h6 className="heading text-primary mb-md-1">
                      More about Data
                    </h6>
                    <p className="description d-none d-md-inline-block mb-0">
                      Learn more about colors, typography, icons and the grid
                      system we used for Argon.
                    </p>
                  </Media>
                </Media>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <NavLink href="/landing/index#events">
              <i className="ni ni-calendar-grid-58" />
              News & Events
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/landing/index#contact-us">
              <i className="ni ni-email-83" />
              Contact Us <span className="sr-only">(current)</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/landing/index#partners">
              <i className="ni ni-satisfied" />
              Our Partners <span className="sr-only">(current)</span>
            </NavLink>
          </NavItem>
        </Nav>
      </>
    );
  }
}

export default SharedNavbar;
