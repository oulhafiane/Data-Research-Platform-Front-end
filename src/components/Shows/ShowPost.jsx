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
import { Card, CardTitle, CardHeader, CardBody, Row, Col } from "reactstrap";
import CarouselPost from "components/Carousels/CarouselPost";

class ShowPost extends React.Component {
  state = {
    photo_user: require("assets/img/theme/user-profile.png")
  };

  newproblematic = e => {
    e.preventDefault();
    this.props.history.push("/default/new");
  };

  render() {
    const { state } = this.props;
    return (
      <>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl={this.props.width}>
          <Card className="card-profile shadow">
            {state.images_available ? (
              <Row>
                <Col>
                  <CarouselPost
                    imgs={state.imgs}
                    height={this.props.height ? this.props.height : "400px"}
                  />
                </Col>
              </Row>
            ) : null}
            <Row className="justify-content-center">
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
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between"></div>
            </CardHeader>
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
                <h3>{state.prob.title}</h3>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2" />
                  {state.categories[state.id_domain].title} -{" "}
                  {
                    state.categories[state.id_domain].sub_categories[
                      state.id_category
                    ].title
                  }
                </div>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  {state.prob.type}
                </div>
                <div>
                  <a href={state.prob.link} target="_blank">
                    <i className="ni education_hat mr-2" />
                    {state.prob.link}
                  </a>
                </div>
              </div>
              <hr className="my-4" />

              <CardTitle className="form-control-label">Description</CardTitle>
              <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>
                {state.prob.description}
              </p>
              {state.showSolution ? (
                <>
                  <hr className="my-4" />
                  <CardTitle className="form-control-label">Solution</CardTitle>
                  <p style={{ whiteSpace: "pre-line", marginLeft: "10px" }}>
                    {state.prob.solution}
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
                    {state.prob.advantage}
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
                    {state.prob.possibleApplication}
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
