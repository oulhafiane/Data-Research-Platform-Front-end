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
import axios from "axios";
import InputText from "../components/Inputs/Input";
import { DEFAULT_URL } from "../config";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Alert
} from "reactstrap";

class Register extends React.Component {
  state = {
    person: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      type: "customer"
    },
    showSuccess: false,
    showWarning: false,
    showGlobalWarning: false,
    extras: {},
    seconds: 5,
    accepted: false
  };

  submitData = () => {
    this.setState({ showWarning: false });
    if (this.state.accepted === false) {
      this.setState({ showWarning: true });
      return;
    }
    axios
      .post(`${DEFAULT_URL}api/register`, this.state.person)
      .then(res => {
        this.setState({ extras: {} });
        this.setState({ showSuccess: true });
        const intervalID = setInterval(() => {
          this.setState({ seconds: this.state.seconds - 1 });
          if (this.state.seconds === 0) {
            window.clearInterval(intervalID);
          }
        }, 1000);
        setTimeout(() => {
          this.props.history.push("/auth/login");
        }, 5000);
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.extras
        ) {
          this.setState({ extras: error.response.data.extras });
        } else {
          this.setState({ showGlobalWarning: true });
        }
      });
  };

  onChange = e =>
    this.setState({
      person: { ...this.state.person, [e.target.name]: e.target.value }
    });

  onCheck = e => {
    this.setState({
      accepted: e.target.checked
    });
  };

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <Form role="form">
                <InputText
                  icon="ni ni-hat-3"
                  placeholder="First Name"
                  type="Text"
                  name="firstName"
                  onChange={this.onChange}
                  stateError={this.state.extras.firstName !== undefined}
                  errorMessage={this.state.extras.firstName}
                />

                <InputText
                  icon="ni ni-hat-3"
                  placeholder="Last Name"
                  type="Text"
                  name="lastName"
                  onChange={this.onChange}
                  stateError={this.state.extras.lastName !== undefined}
                  errorMessage={this.state.extras.lastName}
                />
                <InputText
                  icon="ni ni-email-83"
                  placeholder="Email"
                  type="Email"
                  name="email"
                  onChange={this.onChange}
                  stateError={this.state.extras.email !== undefined}
                  errorMessage={this.state.extras.email}
                />
                <InputText
                  icon="ni ni-lock-circle-open"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  stateError={this.state.extras.plainPassword !== undefined}
                  errorMessage={this.state.extras.plainPassword}
                />
                <InputText
                  icon="ni ni-mobile-button"
                  placeholder="Phone"
                  type="Phone"
                  name="phone"
                  onChange={this.onChange}
                  stateError={this.state.extras.phone !== undefined}
                  errorMessage={this.state.extras.phone}
                />

                {this.state.showSuccess ? (
                  <Alert color="success">
                    <strong>Success!</strong> You will be redirected to the
                    login page after {this.state.seconds} seconds!
                  </Alert>
                ) : null}

                {this.state.showWarning ? (
                  <Alert color="warning">
                    <strong>Warning!</strong> You must agree to the terms and
                    conditions to continue!
                  </Alert>
                ) : null}

                {this.state.showGlobalWarning ? (
                  <Alert color="danger">
                    <strong>Error!</strong> An error occured!
                  </Alert>
                ) : null}

                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        checked={this.state.accepted}
                        onChange={this.onCheck}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a
                            href="#pablo"
                            onClick={e => {
                              e.preventDefault();
                            }}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button
                    className="mt-4"
                    color="primary"
                    type="button"
                    onClick={this.submitData}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
