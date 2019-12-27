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
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  CardHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import Data from "./Data";

class Structure extends React.Component {
  state = {};
  render() {
    return (
      <>
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="12">
            <Data state={this.state} />
            <div className="btn-wrapper" style={{ marginTop: "20px" }}>
              <Button color="success" to="/login-page" tag={Link}>
                Save
              </Button>
              <Button
                className="btn-white"
                color="default"
                to="/register-page"
                tag={Link}
              >
                Add Table
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Structure;
