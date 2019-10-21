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

// reactstrap components
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  FormGroup
} from "reactstrap";
import CarouselPost from "components/Carousels/CarouselPost";

class ShowPost extends React.Component {
  state = {
    photo_user: require("assets/img/theme/user-profile.png")
  };
  newProblematic = e => {
    e.preventDefault();
    this.props.history.push("/default/new");
  };
  render() {
    const { prob, state } = this.props;
    return (
      <>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="6">
          <Card className="card-profile shadow">
            <Row>
              <Col>
                <CarouselPost />
              </Col>
            </Row>
            <Row style={{ marginLeft: "10px" }}>
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle"
                      src={this.state.photo_user}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardBody className="pt-0 pt-md-4">
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span className="heading">0</span>
                      <span className="description">Recommendations</span>
                    </div>
                    <div>
                      <span className="heading">0</span>
                      <span className="description">Comments</span>
                    </div>
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{prob.title}</h3>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2" />
                  {prob.domain} - {prob.category}
                </div>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  {prob.type}
                </div>
                <div>
                  <i className="ni education_hat mr-2" />
                  {prob.link}
                </div>
              </div>
              <hr className="my-4" />

              <CardTitle className="form-control-label">Description</CardTitle>
              <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>
                {prob.description}
              </p>
              {state.showSolution ? (
                <>
                  <hr className="my-4" />
                  <CardTitle className="form-control-label">Solution</CardTitle>
                  <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>
                    {prob.solution}
                  </p>
                </>
              ) : null}
              {state.showAdvantage ? (
                <>
                  <hr className="my-4" />
                  <CardTitle className="form-control-label">
                    Advantages of the solution
                  </CardTitle>

                  <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>
                    {prob.advantage}
                  </p>
                </>
              ) : null}
              {state.showApplications ? (
                <>
                  <hr className="my-4" />

                  <CardTitle className="form-control-label">
                    Possible Applications
                  </CardTitle>
                  <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>
                    {prob.applications}
                  </p>
                </>
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default ShowPost;
