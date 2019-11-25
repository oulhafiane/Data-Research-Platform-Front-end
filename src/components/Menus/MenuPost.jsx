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
import Axios from "axios";
import { DEFAULT_URL } from "../../config";

// reactstrap components
import {
  UncontrolledCollapse,
  Navbar,
  NavItem,
  Nav,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  Button
} from "reactstrap";
import SelectLabel from "components/Inputs/SelectLabel";
import CreatableSelectLabel from "components/Inputs/CreatableSelectLabel";

const createOption = label => ({
  label,
  value: label
});

class MenuPost extends React.Component {
  render() {
    return (
      <>
        <Row
          className="justify-content-center"
          style={{ margin: "30px", marginTop: "-100px" }}
        >
          {/* Menu */}
          <Col lg="12">
            <Navbar className="navbar-dark rounded" expand="lg">
              <UncontrolledCollapse navbar toggler="#nav-inner-primary">
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
                      <button
                        className="navbar-toggler"
                        id="nav-inner-primary"
                        type="button"
                      >
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <NavItem>
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={this.newProblematic}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </Button>
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={this.newProblematic}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </Button>
                  </NavItem>
                </Nav>
                {/* <Nav className="ml-lg-auto" navbar>
                  
                </Nav> */}
              </UncontrolledCollapse>
            </Navbar>
          </Col>
        </Row>
      </>
    );
  }
}

export default MenuPost;
