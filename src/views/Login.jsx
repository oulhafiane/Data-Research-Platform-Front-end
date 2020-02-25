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

import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import InputText from '../components/Inputs/Input'
import InputTextLabel from 'components/Inputs/InputLabel'
import GoogleLogin from 'react-google-login'
import Axios from 'axios'
import { DEFAULT_URL } from '../config'
import authService from '../services/auth-service'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  Alert,
  Modal,
} from 'reactstrap'

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
    },
    showError: false,
    errors: {},
    username: '',
    errorModalMessage: undefined,
    showErrorModal: false,
    showSuccess: false,
    successMessage: null,
    uploading: false,
    disableSendButton: false,
    token: null,
    errorModalMessage2: undefined,
    showErrorModal2: false,
    showSuccess2: false,
    successMessage2: null,
    uploading2: false,
    disableSendButton2: false,
    password: '',
    password2: '',
  }
  onChangeInputModal = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    })
  }
  forgotPassword = e => {
    e.preventDefault()
    if ('' === this.state.username) {
      this.setState({ showErrorModal: true, errorModalMessage: undefined })
      return
    }
    this.setState({
      errorModalMessage: undefined,
      showErrorModal: false,
      showSuccess: false,
      successMessage: null,
      uploading: true,
    })
    const data = {
      username: this.state.username,
    }
    Axios.post(`${DEFAULT_URL}api/forgotPassword`, data)
      .then(res => {
        this.setState({
          showSuccess: true,
          successMessage: res.data.message,
          uploading: false,
          disableSendButton: true,
        })
      })
      .catch(error => {
        this.setState({
          showErrorModal: true,
          errorModalMessage: error.response
            ? error.response.message
              ? error.response.message
              : 'An error occured!'
            : 'An error occured!',
          uploading: false,
        })
      })
  }
  changePassword = e => {
    e.preventDefault()
    console.log(this.state.password)
    if ('' === this.state.password || '' === this.state.password2) {
      this.setState({
        showErrorModal2: true,
        errorModalMessage2:
          'The password and confirmation password must not be empty!',
      })
      return
    }
    if (this.state.password !== this.state.password2) {
      this.setState({ showErrorModal2: true, errorModalMessage2: undefined })
      return
    }
    this.setState({
      errorModalMessage2: undefined,
      showErrorModal2: false,
      showSuccess2: false,
      successMessage2: null,
      uploading2: true,
    })
    const data = {
      token: this.state.token,
      password: this.state.password,
    }
    Axios.post(`${DEFAULT_URL}api/changePassword`, data)
      .then(res => {
        this.setState({
          showSuccess2: true,
          successMessage2: res.data.message,
          uploading2: false,
          disableSendButton2: true,
        })
      })
      .catch(error => {
        this.setState({
          showErrorModal2: true,
          errorModalMessage2: error.response
            ? error.response.data
              ? error.response.data.message
                ? error.response.data.message
                : 'An error occured!'
              : 'An error occured!'
            : 'An error occured!',
          uploading2: false,
        })
      })
  }
  googleAuth = res => {
    const data = {
      provider: 'google',
      token: res.tokenId,
    }
    Axios.post(`${DEFAULT_URL}api/oauth`, data)
      .then(res => {
        authService.successAuth(res, this.props)
      })
      .catch(error => {
        this.setState({ showError: true })
      })
  }
  onChange = e =>
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    })
  submitData = () => {
    this.setState({ showError: false, error: undefined })
    axios
      .post(`${DEFAULT_URL}api/auth`, this.state.credentials)
      .then(res => {
        authService.successAuth(res, this.props)
      })
      .catch(error => {
        this.setState({
          showError: true,
          error: error.response
            ? 'Unauthorized Access'
            : 'No Internet Conncetion!',
        })
      })
  }

  componentDidMount() {
    const search = this.props.location.search.split('?recover=')
    if (2 === search.length) {
      this.toggleModal('defaultModal2')
      this.setState({ token: search[1] })
    }
  }

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
                          src={require('assets/img/icons/common/google.svg')}
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
                      error: 'Unauthorized Access',
                    })
                  }
                  cookiePolicy={'single_host_origin'}
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
                    <strong>Error!</strong>{' '}
                    {this.state.error ? this.state.error : 'Bad credentials!'}
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
                href="#forgot"
                onClick={() => this.toggleModal('defaultModal')}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <Link className="text-light" to="/auth/register">
                <small>Create new account</small>
              </Link>
            </Col>
          </Row>
        </Col>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.defaultModal}
          toggle={() => this.toggleModal('defaultModal')}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Forgot Password
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal('defaultModal')}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <InputTextLabel
              id="username"
              placeholder="Email"
              type="text"
              val={this.state.username}
              onChange={this.onChangeInputModal}
            />
            {this.state.showErrorModal ? (
              <Alert color="danger">
                <strong>Error!</strong>{' '}
                {this.state.errorModalMessage
                  ? this.state.errorModalMessage
                  : 'Email field should not be blank!'}
              </Alert>
            ) : null}
            {this.state.showSuccess ? (
              <Alert color="success">
                <strong>Success!</strong> {this.state.successMessage}
              </Alert>
            ) : null}
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              type="button"
              onClick={this.forgotPassword}
              disabled={this.state.disableSendButton}
            >
              {this.state.uploading ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Sending...
                </React.Fragment>
              ) : (
                'Send'
              )}
            </Button>
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal('defaultModal')}
            >
              Close
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.defaultModal2}
          toggle={() => this.toggleModal('defaultModal2')}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Change Password
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal('defaultModal2')}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <InputTextLabel
              id="password"
              placeholder="Password"
              type="password"
              val={this.state.password}
              onChange={this.onChangeInputModal}
            />
            <InputTextLabel
              id="password2"
              placeholder="Confirmation Password"
              type="password"
              val={this.state.password2}
              onChange={this.onChangeInputModal}
            />
            {this.state.showErrorModal2 ? (
              <Alert color="danger">
                <strong>Error!</strong>{' '}
                {this.state.errorModalMessage2
                  ? this.state.errorModalMessage2
                  : 'Your password and confirmation password do not match!'}
              </Alert>
            ) : null}
            {this.state.showSuccess2 ? (
              <Alert color="success">
                <strong>Success!</strong> {this.state.successMessage2}
              </Alert>
            ) : null}
          </div>
          <div className="modal-footer">
            <Button
              color="primary"
              type="button"
              onClick={this.changePassword}
              disabled={this.state.disableSendButton2}
            >
              {this.state.uploading2 ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Changing...
                </React.Fragment>
              ) : (
                'Change'
              )}
            </Button>
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal('defaultModal2')}
            >
              Close
            </Button>
          </div>
        </Modal>
      </>
    )
  }
}

export default Login
