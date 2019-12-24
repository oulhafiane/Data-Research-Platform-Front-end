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

class Structure extends React.Component {
  state = {
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" }
  };
  render() {
    return (
      <>
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="9">
            <h3 className="display-3">
              A beautiful Design System <span>completed with examples</span>
            </h3>
            <p>
              The Design System comes with four pre-built pages to help you get
              started faster. You can change the text and images and you're good
              to go. More importantly, looking at them will give you a picture
              of what you can built with this powerful Bootstrap 4 Design
              System.
            </p>
            <div className="btn-wrapper">
              <Button color="success" to="/login-page" tag={Link}>
                Login Page
              </Button>
              <Button
                className="btn-white"
                color="default"
                to="/register-page"
                tag={Link}
              >
                Register Page
              </Button>
            </div>
          </Col>
          <Col className="mb-lg-auto" lg="3">
            <div>
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-2">
                  <div className="text-muted text-center mb-3">
                    <small>Tools Box</small>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-3 py-lg-3">
                  <div
                    className="scrollbar scrollbar-custom"
                    style={{ width: "100%" }}
                  >
                    <CardBody className="px-lg-1 py-lg-1 centerText">
                      Table
                    </CardBody>
                    <hr className="hr my-1" />
                    <CardBody className="px-lg-1 py-lg-1 centerText">
                      dadsas
                    </CardBody>
                    <hr className="hr my-1" />
                    <CardBody className="px-lg-1 py-lg-1 centerText">
                      dadsas
                    </CardBody>
                    <hr className="hr my-1" />
                    <CardBody className="px-lg-1 py-lg-1 centerText">
                      dadsas
                    </CardBody>
                    <hr className="hr my-1" />
                    <CardBody className="px-lg-1 py-lg-1 centerText">
                      dadsas
                    </CardBody>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Structure;
