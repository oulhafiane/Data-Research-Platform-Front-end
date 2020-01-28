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
import { Link } from "react-router-dom";
import InputTextLabel from "../Inputs/InputLabel";
import { DEFAULT_URL } from "../../config";
import { connect } from "react-redux";
import { getUser } from "actions/userAction";

// reactstrap components
import { Card, CardHeader, CardBody, Button, Row, Col, Form } from "reactstrap";

class ShowComments extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    comment: "",
    comments: [],
    uploading: false,
    limit: 10,
    currentPage: 1,
    totalPages: null,
    itemsCount: null,
    scrolling: false,
    showLoadComments: true,
    target: null
  };

  btnStyle = {
    color: "inherit",
    backgroundColor: "inherit",
    borderRadius: "unset",
    margin: "5px"
  };

  onChange = e =>
    this.setState({
      comment: e.target.value,
      target: e.target
    });

  newproblematic = e => {
    e.preventDefault();
    this.props.history.push("/default/new");
  };

  submitData = e => {
    e.preventDefault();
    this.state.target.value = "";
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = { text: this.state.comment };
    this.setState({ showWarning: false });
    if (this.state.accepted === false) {
      this.setState({ showWarning: true });
      return;
    }
    Axios.post(
      `${DEFAULT_URL}api/problematic/${
        this.props.state.id
      }/comment?timestamp=${new Date().getTime()}`,
      data,
      config
    )
      .then(res => {
        this.props.updateCounts();
        const newComments = this.state.comments
          .reverse()
          .concat({
            "0": {
              id: res.data.extras.id,
              text: data.text,
              creationDate: Date(),
              owner: {
                uuid: this.props.user.uuid,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                _photo: {
                  img: this.props.user._photo
                    ? this.props.user._photo.img
                    : this.props.photo_user
                }
              }
            }
          })
          .reverse();
        this.setState({
          uploading: false,
          comments: newComments
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  loadComments = () => {
    Axios.get(
      `${DEFAULT_URL}api/problematic/${
        this.props.state.id
      }/comment?timestamp=${new Date().getTime()}&limit=${
        this.state.limit
      }&page=${this.state.currentPage}`
    )
      .then(res => {
        this.setState(
          prevState => ({
            comments: [...prevState.comments, ...res.data.comments],
            totalPages: res.data.nbPages,
            itemsCount: res.data.itemsCount,
            currentPage: prevState.currentPage + 1,
            scrolling: false
          }),
          () => {
            if (this.state.currentPage > this.state.totalPages) {
              this.setState({ showLoadComments: false });
            }
          }
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleScroll = e => {
    e.preventDefault();
    if (this.state.scrolling) return;
    if (this.state.currentPage <= this.state.totalPages) {
      this.setState({ scrolling: true });
      this.loadComments();
    }
  };

  componentDidMount() {
    this.props.getUser();
    this.loadComments();
  }

  render() {
    const { state } = this.props;
    return (
      <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        <Card className="card-profile shadow">
          <div className="text-center border-0 pt-md-4 pb-md-4 card-header">
            <Row>
              <Col lg="6">
                <div className="d-flex justify-content-between">Comments</div>
              </Col>
              <Col lg="6">
                <div
                  className="d-flex justify-content-between"
                  style={{ float: "right" }}
                >
                  Total : {state.countComments}
                </div>
              </Col>
            </Row>
          </div>
          <CardBody className="pt-0 pt-md-4">
            <Row>
              <Form style={{ width: "100%" }}>
                <InputTextLabel
                  id="description"
                  placeholder="New comment"
                  type="textarea"
                  val={this.state.comment}
                  onChange={this.onChange}
                  rows="5"
                  style={{ resize: "None" }}
                  disabled={!state.isSearcher}
                />
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={this.submitData}
                  size="sm"
                  style={{ padding: "9px 34px 9px 34px", float: "right" }}
                  disabled={!state.isSearcher}
                >
                  {this.state.uploading ? (
                    <React.Fragment>
                      <i className="fas fa-spin fa-spinner"></i> Uploading...
                    </React.Fragment>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            </Row>
          </CardBody>
          <hr className="my-4" />
          <div className="scrollbar scrollbar-custom">
            {Object.keys(this.state.comments).map(key => {
              return (
                <div key={key}>
                  <CardHeader className="border-top d-flex">
                    <div className="card-post__author d-flex">
                      <a
                        href={`/default/profile/${this.state.comments[key][0].owner.uuid}`}
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{
                          backgroundImage: `url(
                            ${
                              this.state.comments[key][0].owner
                                ? this.state.comments[key][0].owner._photo
                                  ? this.state.comments[key][0].owner._photo.img
                                  : this.props.photo_user
                                : this.props.photo_user
                            }
                          )`
                        }}
                      ></a>
                      <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">
                          {this.state.comments[key][0].owner
                            ? `${this.state.comments[key][0].owner.firstName} ${this.state.comments[key][0].owner.lastName}`
                            : null}
                        </span>
                        <small className="text-muted">
                          {this.state.comments[key][0].creationDate}
                        </small>
                      </div>
                    </div>
                    <div className="my-auto ml-auto">
                      {/* <Button
                        id="up_vote"
                        size="sm"
                        theme="white"
                        style={{
                          ...this.btnStyle,
                          color:
                            this.state.comments[key]["iAmVoted"] == 1
                              ? "red"
                              : "inherit"
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
                          color:
                            this.state.comments[key]["iAmVoted"] == 0
                              ? "red"
                              : "inherit"
                        }}
                        onClick={this.submitData}
                        disabled={!state.isSearcher}
                      >
                        <i id="down_vote_icon" className="ni ni-bold-down" />
                      </Button> */}
                    </div>
                  </CardHeader>
                  <CardBody>
                    <h6 className="card-title">
                      {this.state.comments[key][0].text}
                    </h6>
                  </CardBody>
                  <hr className="my-4" />
                </div>
              );
            })}
            {this.state.showLoadComments ? (
              <div className="text-center" style={{ paddingBottom: "20px" }}>
                <Link to="#" onClick={this.handleScroll}>
                  Load more comments...
                </Link>
              </div>
            ) : null}
          </div>
        </Card>
      </Col>
    );
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user
});

export default connect(mapStateProps, { getUser })(ShowComments);
