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
    comments: {},
    uploading: false,
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
      disabled: false,
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
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        this.setState({
          uploading: false,
          comments: {
            ...this.state.comments,
            [Object.keys(this.state.comments).length + 1]: {
              id: res.data.extras.id,
              text: data.text,
              creationDate: Date.now(),
              owner: user
            }
          }
        });
        this.props.updateCounts();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  componentDidMount() {
    this.props.getUser();
    Axios.get(
      `${DEFAULT_URL}api/problematic/${
        this.props.state.id
      }/comment?timestamp=${new Date().getTime()}`
    )
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    const { state } = this.props;
    return (
      <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        <Card className="card-profile shadow">
          <div className="text-center border-0 pt-md-4 pb-md-4 card-header">
            <div className="d-flex justify-content-between">Comments</div>
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
                />
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={this.submitData}
                  size="sm"
                  disabled={this.state.disabled}
                  style={{ padding: "9px 34px 9px 34px", float: "right" }}
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
                        href="#"
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{
                          backgroundImage: `url('${this.props.photo_user}')`
                        }}
                      ></a>
                      <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">
                          {this.state.comments[key].owner
                            ? `${this.state.comments[key].owner.firstName} ${this.state.comments[key].owner.lastName}`
                            : null}
                        </span>
                        <small className="text-muted">
                          {this.state.comments[key].creationDate}
                        </small>
                      </div>
                    </div>
                    <div className="my-auto ml-auto">
                      <Button size="sm" theme="white" style={this.btnStyle}>
                        <i className="ni ni-bold-up" />
                      </Button>
                      <Button size="sm" theme="white" style={this.btnStyle}>
                        <i className="ni ni-bold-down" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <h6 className="card-title">
                      {this.state.comments[key].text}
                    </h6>
                  </CardBody>
                  <hr className="my-4" />
                </div>
              );
            })}
          </div>
        </Card>
      </Col>
    );
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user
});

export default connect(
  mapStateProps,
  { getUser }
)(ShowComments);
