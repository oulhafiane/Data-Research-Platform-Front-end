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
import Axios from "axios";
import InputTextLabel from "../components/Inputs/InputLabel";
import { DEFAULT_URL } from "../config";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  state = {
    token: localStorage.getItem("token"),
    user: {},
    disabled: true,
    photo_user: require("assets/img/theme/user-profile.png"),
    file: null,
    showGlobalWarning: false,
    showSuccess: false,
    uploadingPhoto: false,
    uploading: false
  };

  cardStats = { padding: ".275rem" };

  toBase64 = img => {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      const config = {
        headers: { Authorization: "bearer " + this.state.token }
      };
      Axios.post(
        `${DEFAULT_URL}api/current/update_photo`,
        { photo: fileReader.result },
        config
      )
        .then(res => {
          this.setState({
            photo_user: URL.createObjectURL(img),
            uploadingPhoto: false
          });
        })
        .catch(error => {
          console.log(error.response.data);
        });
    };
    fileReader.readAsDataURL(img);
  };

  onFilesAdded = e => {
    this.setState({ uploadingPhoto: true });
    const files = e.target.files;
    this.toBase64(files[0]);
  };

  onChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
      disabled: false
    });
  };

  updatePhoto = e => {
    e.preventDefault();
    this.fileInputRef.current.click();
  };

  updateProfile = e => {
    e.preventDefault();
    this.setState({
      showSuccess: false,
      showGlobalWarning: false,
      uploading: true
    });
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.post(`${DEFAULT_URL}api/current/update`, this.state.user, config)
      .then(res => {
        this.setState({ showSuccess: true, uploading: false });
        console.log(res);
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Expired JWT Token"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.props.history.push("/auth/login");
        } else {
          this.setState({
            message: error.response.data.message,
            showGlobalWarning: true
          });
        }
      });
  };

  checkUser = () => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    if (this.state.token !== undefined) {
      Axios.get(`${DEFAULT_URL}api/current/infos`, config)
        .then(res => {
          if (res.data !== undefined) {
            this.setState({ user: res.data });
            if (res.data._photo)
              this.setState({ photo_user: res.data._photo.img });
          }
        })
        .catch(error => {
          localStorage.removeItem("token");
          this.props.history.push("/auth/login");
        });
    } else {
      this.props.history.push("/auth/login");
    }
  };

  componentDidMount() {
    this.checkUser();
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container fluid className="main-content-container px-4">
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <input
                        name="photo"
                        accept="image/*"
                        ref={this.fileInputRef}
                        onChange={this.onFilesAdded}
                        className="FileInput"
                        type="file"
                        autoComplete="off"
                        tabIndex="-1"
                        style={{ display: "none" }}
                      />
                      <a href="#pablo" onClick={this.updatePhoto}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={this.state.photo_user}
                          style={{ width: "180px", height: "180px" }}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  {this.state.uploadingPhoto ? (
                    <Row>
                      <Col>
                        <div
                          className="card-profile-stats d-flex justify-content-center"
                          style={{ marginTop: "100px" }}
                        >
                          <React.Fragment>
                            <i className="fas fa-spin fa-spinner"></i>
                          </React.Fragment>
                        </div>
                      </Col>
                    </Row>
                  ) : null}
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-6">
                        <div style={this.cardStats}>
                          <span className="heading">22</span>
                          <span className="description">Problematics</span>
                        </div>
                        <div style={this.cardStats}>
                          <span className="heading">10</span>
                          <span className="description">Recommendations</span>
                        </div>
                        <div style={this.cardStats}>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.user.firstName} {this.state.user.lastName}
                    </h3>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.user.city} {this.state.user.country}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      {this.state.user.organization}
                    </div>
                    <hr className="my-4" />
                    <p style={{ whiteSpace: "pre-line" }}>
                      {this.state.user.bio}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <InputTextLabel
                            id="organization"
                            placeholder="Organization"
                            type="text"
                            val={this.state.user.organization}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="6">
                          <InputTextLabel
                            id="email"
                            placeholder="Email"
                            type="text"
                            val={this.state.user.email}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <InputTextLabel
                            id="firstName"
                            placeholder="First name"
                            type="text"
                            val={this.state.user.firstName}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="6">
                          <InputTextLabel
                            id="lastName"
                            placeholder="Last name"
                            type="text"
                            val={this.state.user.lastName}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <InputTextLabel
                            id="address"
                            placeholder="Address"
                            type="text"
                            val={this.state.user.address}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <InputTextLabel
                            id="city"
                            placeholder="City"
                            type="text"
                            val={this.state.user.city}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="4">
                          <InputTextLabel
                            id="country"
                            placeholder="Country"
                            type="text"
                            val={this.state.user.country}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="4">
                          <InputTextLabel
                            id="postalCode"
                            placeholder="Postal code"
                            type="text"
                            val={this.state.user.postalCode}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <InputTextLabel
                        id="bio"
                        placeholder="About me"
                        type="textarea"
                        val={this.state.user.bio}
                        onChange={this.onChange}
                        rows="10"
                      />
                    </div>
                    {this.state.showSuccess ? (
                      <Alert color="success">
                        <strong>Success!</strong> You profile has been updated.
                      </Alert>
                    ) : null}
                    {this.state.showGlobalWarning ? (
                      <Alert color="danger">
                        <strong>Error!</strong> {this.state.message}
                      </Alert>
                    ) : null}
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={this.updateProfile}
                      size="sm"
                      disabled={this.state.disabled}
                      style={{ padding: "9px 34px 9px 34px", float: "right" }}
                    >
                      {this.state.uploading ? (
                        <React.Fragment>
                          <i className="fas fa-spin fa-spinner"></i>{" "}
                          Uploading...
                        </React.Fragment>
                      ) : (
                        "Update profile"
                      )}
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
