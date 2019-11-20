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
import { Link } from "react-router-dom";
import { DEFAULT_URL } from "../config";
// reactstrap components
import { Card, CardBody, Container, Row, Badge, Col } from "reactstrap";
import Menu from "components/Menus/Menu";

class Profile extends React.Component {
  state = {
    photo_user: require("assets/img/theme/user-profile.png"),
    photo_default: require("assets/img/theme/profile-cover.jpg"),
    token: localStorage.getItem("token"),
    data: []
  };

  componentDidMount() {
    Axios.get(`${DEFAULT_URL}api/problematic/all`)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <>
        <Container fluid className="main-content-container px-4">
          {/* First Row of Posts */}
          <Menu {...this.props} />
          <Row>
            {this.state.data.map((post, key) => {
              return (
                <Col lg="3" md="6" sm="12" className="mb-4" key={key}>
                  <Card className="card-post card-post--1">
                    <div
                      className="card-post__image"
                      style={{
                        backgroundImage: `url(${
                          post[0].photos[0].img
                            ? post[0].photos[0].img
                            : this.state.photo_default
                        })`
                      }}
                    >
                      <Badge
                        pill
                        className={`card-post__category bg-${post[0].category.id}`}
                      >
                        {post[0].category.title}
                      </Badge>
                      <div className="card-post__author d-flex">
                        <Link
                          to={`/default/profile/${post[0].owner.uuid}`}
                          className="card-post__author-avatar"
                          style={{
                            backgroundImage: `url('${
                              post[0].owner._photo
                                ? post[0].owner._photo.img
                                : this.state.photo_user
                            }')`
                          }}
                        >
                          Written by {post[0].owner.firstName}{" "}
                          {post[0].owner.lastName}
                        </Link>
                      </div>
                    </div>
                    <CardBody>
                      <h5 className="card-title">
                        <Link
                          to={`/default/posts/${post[0].id}`}
                          className="text-fiord-blue"
                        >
                          {post[0].title}
                        </Link>
                      </h5>
                      <p className="card-text mb-3 post">
                        {post[0].description}
                      </p>
                      <span className="text-muted">{post[0].creationDate}</span>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
