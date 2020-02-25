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
import Axios from "axios";
import { DEFAULT_URL } from "../../config";

// reactstrap components
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button
} from "reactstrap";
import CarouselPost from "components/Carousels/CarouselPost";

class ShowPost extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    photo_user: require("assets/img/theme/user-profile.png"),
    up_voted: false,
    down_voted: false
  };

  btnStyle = {
    color: "inherit",
    backgroundColor: "inherit",
    borderRadius: "unset",
    margin: "5px"
  };

  newproblematic = e => {
    e.preventDefault();
    this.props.history.push("/default/new");
  };

  getCounts = () => {};

  componentDidMount() {
    if (this.props.request) {
      const config = {
        headers: { Authorization: "bearer " + this.state.token }
      };
      Axios.get(
        `${DEFAULT_URL}api/current/problematic/${
          this.props.state.id
        }/vote?timestamp=${new Date().getTime()}`,
        config
      )
        .then(res => {
          if (!res.data.extras)
            this.setState({ up_voted: false, down_voted: false });
          else if (res.data.extras.vote === true)
            this.setState({ up_voted: true, down_voted: false });
          else this.setState({ up_voted: false, down_voted: true });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }

  submitData = e => {
    e.preventDefault();
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {};
    if (e.target.id === "up_vote" || e.target.id === "up_vote_icon") {
      data = { good: true };
    } else if (
      e.target.id === "down_vote" ||
      e.target.id === "down_vote_icon"
    ) {
      data = { good: false };
    } else return;
    Axios.post(
      `${DEFAULT_URL}api/problematic/${
        this.props.state.id
      }/vote?timestamp=${new Date().getTime()}`,
      data,
      config
    )
      .then(res => {
        if (res.data.extras === undefined)
          this.setState({ up_voted: false, down_voted: false });
        else if (data.good === true)
          this.setState({ up_voted: true, down_voted: false });
        else if (data.good === false)
          this.setState({ up_voted: false, down_voted: true });
        this.props.getCounts();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    const { state, photo_user } = this.props;
    return (
      <Col className="order-xl-2 mb-5 mb-xl-0" xl={this.props.width}>
        <Card className="card-profile shadow">
          {state.images_available ? (
            <Row>
              <Col>
                <CarouselPost imgs={state.imgs} />
              </Col>
            </Row>
          ) : null}
          <Row className="justify-content-center">
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <Link
                  to={
                    state.prob.owner
                      ? `/default/profile/${state.prob.owner.uuid}`
                      : "#pablo"
                  }
                >
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={
                      state.prob.owner && state.prob.owner._photo
                        ? state.prob.owner._photo.img
                        : photo_user
                        ? photo_user
                        : this.state.photo_user
                    }
                    style={{ width: "180px", height: "180px" }}
                  />
                </Link>
              </div>
            </Col>
          </Row>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div
              className="d-flex justify-content-between"
              style={{ height: "50px" }}
            >
              {this.props.request ? (
                <div className="my-auto ml-auto">
                  <Row>
                    <span
                      className="description"
                      style={{ marginLeft: "14px" }}
                    >
                      Votes : {state.countVotes}
                    </span>
                  </Row>
                  <Row>
                    <Button
                      id="up_vote"
                      size="sm"
                      theme="white"
                      style={{
                        ...this.btnStyle,
                        color: this.state.up_voted ? "red" : "inherit"
                      }}
                      onClick={this.submitData}
                      disabled={!state.isSearcher}
                    >
                      <i id="up_vote_icon" className="ni ni-bold-up" />
                    </Button>
                    <Button
                      id="down_vote"
                      size="sm"
                      theme="white"
                      style={{
                        ...this.btnStyle,
                        color: this.state.down_voted ? "red" : "inherit"
                      }}
                      onClick={this.submitData}
                      disabled={!state.isSearcher}
                    >
                      <i id="down_vote_icon" className="ni ni-bold-down" />
                    </Button>
                  </Row>
                </div>
              ) : null}
            </div>
          </CardHeader>
          <CardBody className="pt-0 pt-md-4">
            {state.prob.owner ? (
              <h3>
                <div
                  className="text-center"
                  style={{ marginTop: "20px", marginBottom: "60px" }}
                >
                  <Link to={`/default/profile/${state.prob.owner.uuid}`}>
                    {state.prob.owner.firstName +
                      " " +
                      state.prob.owner.lastName}
                  </Link>
                  {state.prob.researchers
                    ? state.prob.researchers.map((val, key) => (
                        <span key={key}>
                          ,{" "}
                          {val.__isNew__ ? (
                            val.label
                          ) : (
                            <Link
                              key={key}
                              to={`/default/profile/${val.value}`}
                            >
                              {val.label}
                            </Link>
                          )}
                        </span>
                      ))
                    : null}
                </div>
              </h3>
            ) : null}
            {/* <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                  {this.props.request ? (
                    <>
                      <div>
                        <span className="heading">{state.countVotes}</span>
                        <span className="description">Recommendations</span>
                      </div>
                      <div>
                        <span className="heading">{state.countComments}</span>
                        <span className="description">Comments</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </Row> */}
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
                <a
                  href={state.prob.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ni education_hat mr-2" />
                  {state.prob.link}
                </a>
              </div>
            </div>
            <hr className="my-4" />

            <CardTitle className="form-control-label">Problematic</CardTitle>
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
    );
  }
}

export default ShowPost;
