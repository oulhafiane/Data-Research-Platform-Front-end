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
import GoogleLogin from "react-google-login";
import Axios from "axios";
import { DEFAULT_URL } from "../config";
import authService from "../services/auth-service";

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

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    },
    showError: false,
    errors: {}
  };
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
  onChange = e =>
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  submitData = () => {
    this.setState({ showError: false, error: undefined });
    axios
      .post(`${DEFAULT_URL}api/auth`, this.state.credentials)
      .then(res => {
        authService.successAuth(res, this.props);
      })
      .catch(error => {
        this.setState({ showError: true });
      });
  };

  render() {
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
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
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <InputText
                  icon="ni ni-email-83"
                  placeholder="Email"
                  type="email"
                  name="username"
                  val={this.state.credentials.username}
                  onChange={this.onChange}
                  stateError={this.state.showUsernameError !== undefined}
                  errorMessage={this.state.errors.username}
                />
                <InputText
                  icon="ni ni-lock-circle-open"
                  placeholder="Password"
                  type="password"
                  name="password"
                  val={this.state.credentials.password}
                  onChange={this.onChange}
                  stateError={this.state.showPasswordError !== undefined}
                  errorMessage={this.state.errors.password}
                />

                {this.state.showError ? (
                  <Alert color="danger">
                    <strong>Error!</strong>{" "}
                    {this.state.error ? this.state.error : "Bad credentials!"}
                  </Alert>
                ) : null}

                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={this.submitData}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a className="text-light" href="/auth/register">
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
