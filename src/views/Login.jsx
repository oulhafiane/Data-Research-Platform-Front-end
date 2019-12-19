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

  onChange = e =>
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  showError;
  submitData = () => {
    this.setState({ showError: false });
    axios
      .post(`${DEFAULT_URL}api/auth`, this.state.credentials)
      .then(res => {
        if (res.data.token !== undefined) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          this.props.history.push("/default/posts");
        }
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
                    <strong>Error!</strong> Bad credentials!
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
