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
import Axios from "axios";
import { DEFAULT_URL } from "../config";
import GoogleLogin from "react-google-login";
import authService from "../services/auth-service";

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
      organization: "",
      jobTitle: "",
      type: "searcher"
    },
    showSuccess: false,
    showWarning: false,
    showGlobalWarning: false,
    extras: {},
    seconds: 3,
    accepted: false
  };
  loginSuccess = res => {};
  googleAuth = res => {
    const data = {
      provider: "google",
      token: res.tokenId
    };
    Axios.post(`${DEFAULT_URL}api/oauth`, data)
      .then(res => {
        authService.successAuth(res, this.props);
      })
      .catch(error => {
        this.setState({ showError: true });
      });
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
        }, 3000);
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
                <GoogleLogin
                  clientId="363549688127-4re3k697mg5ue1ngedfc2it2nd0mo1jh.apps.googleusercontent.com"
                  render={renderProps => (
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <span className="btn-inner--icon">
                        <img
                          alt="..."
                          src={require("assets/img/icons/common/google.svg")}
                        />
                      </span>
                      <span className="btn-inner--text">Google</span>
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={this.googleAuth}
                  onFailure={response =>
                    this.setState({
                      showError: true,
                      error: "Unauthorized Access"
                    })
                  }
                  cookiePolicy={"single_host_origin"}
                />
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
                  placeholder="Organization"
                  type="Text"
                  name="organization"
                  onChange={this.onChange}
                  stateError={this.state.extras.organization !== undefined}
                  errorMessage={this.state.extras.organization}
                />
                <InputText
                  icon="ni ni-mobile-button"
                  placeholder="Job Title"
                  type="Text"
                  name="jobTitle"
                  onChange={this.onChange}
                  stateError={this.state.extras.jobTitle !== undefined}
                  errorMessage={this.state.extras.jobTitle}
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
