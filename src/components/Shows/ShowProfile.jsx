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
import Axios from "axios";
import { DEFAULT_URL } from "../../config";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Alert } from "reactstrap";

class ShowProfile extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  state = {
    token: localStorage.getItem("token"),
    photo_user: null,
    uploadingPhoto: false
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
          this.setState({ uploadingPhoto: false, showGlobalError: true });
          console.log(error.response.data);
        });
    };
    fileReader.readAsDataURL(img);
  };

  onFilesAdded = e => {
    this.setState({ uploadingPhoto: true, showGlobalError: false });
    const files = e.target.files;
    this.toBase64(files[0]);
  };

  updatePhoto = e => {
    e.preventDefault();
    this.fileInputRef.current.click();
  };

  render() {
    const { state } = this.props;
    return (
      <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        {this.state.showGlobalError ? (
          <Alert color="danger">
            <strong>Error!</strong> {this.state.message}
          </Alert>
        ) : null}
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
                    src={
                      this.state.photo_user
                        ? this.state.photo_user
                        : state.user
                        ? state.user._photo
                          ? state.user._photo.img
                          : this.props.photo_user
                        : this.props.photo_user
                    }
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
                    <span className="heading">
                      {state.user.countProblematics}
                    </span>
                    <span className="description">Problematics</span>
                  </div>
                  <div style={this.cardStats}>
                    <span className="heading">{state.user.countComments}</span>
                    <span className="description">Comments</span>
                  </div>
                  {/* <div style={this.cardStats}>
                    <span className="heading">{state.user.countFollowers}</span>
                    <span className="description">Followers</span>
                  </div> */}
                </div>
              </div>
            </Row>
            <div className="text-center">
              <h3>{`${state.user.firstName} ${state.user.lastName}`}</h3>
              <div className="h6 mt-4">
                <i className="ni business_briefcase-24 mr-2" />
                {state.user.jobTitle} - {state.user.organization}
              </div>
              <div>
                <i className="ni education_hat mr-2" />
                {state.user.domains
                  ? state.user.domains.map((val, key) => (
                      <div key={key}>{val.title}</div>
                    ))
                  : null}
              </div>
              <hr className="my-4" />
              <p style={{ whiteSpace: "pre-line" }}>{state.user.bio}</p>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ShowProfile;
