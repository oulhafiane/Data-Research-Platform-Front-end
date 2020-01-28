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

// reactstrap components
import { Card, CardHeader, Row, Col } from "reactstrap";

class ShowPublicProfile extends React.Component {
  cardStats = { padding: ".275rem" };

  render() {
    const { state } = this.props;
    return (
      <Row>
        <Card
          className={`card-profile shadow ${this.props.mt}`}
          style={{ width: "100%" }}
        >
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div className="d-flex justify-content-between"></div>
          </CardHeader>
          <div className="px-4">
            <Row className="justify-content-center">
              <Col className="order-lg-2 mt--5" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={
                        state.profile._photo
                          ? state.profile._photo.img
                          : state.photo_user
                      }
                      style={{ width: "180px", height: "180px" }}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <div className="card-profile-stats d-flex justify-content-center mt-7">
              <div style={this.cardStats}>
                <span className="heading">
                  {state.profile.countProblematics}
                </span>
                <span className="description">Problematics</span>
              </div>
              <div style={this.cardStats}>
                <span className="heading">{state.profile.countComments}</span>
                <span className="description">Comments</span>
              </div>
              {/* <div style={this.cardStats}>
                <span className="heading">{state.profile.countFollowers}</span>
                <span className="description">Followers</span>
              </div> */}
            </div>
            <div className="text-center mt--2">
              <h3>{`${state.profile.firstName} ${state.profile.lastName}`}</h3>
              <div className="h6 mt-4">
                <i className="ni business_briefcase-24 mr-2" />
                {state.profile.jobTitle} - {state.profile.organization}
              </div>
              <div>
                <i className="ni education_hat mr-2" />
                {state.profile.domains
                  ? state.profile.domains.map((val, key) => (
                      <div key={key}>{val.title}</div>
                    ))
                  : null}
              </div>
            </div>
            <div className="mt-5 py-5 border-top text-center">
              <Row className="justify-content-center">
                <Col lg="9">
                  <p style={{ whiteSpace: "pre-line" }}>{state.profile.bio}</p>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </Row>
    );
  }
}

export default ShowPublicProfile;
