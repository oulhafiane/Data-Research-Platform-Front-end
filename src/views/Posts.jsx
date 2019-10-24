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
import { DEFAULT_URL } from "../config";
// reactstrap components
import { Card, CardBody, Container, Row, Badge, Col } from "reactstrap";
import Menu from "components/Menus/Menu";

class Profile extends React.Component {
  state = {
    photo_user: require("assets/img/theme/user-profile.png"),
    token: localStorage.getItem("token"),
    data: []
  };

  componentDidMount() {
    console.log("Ok now");
    Axios.get(`${DEFAULT_URL}api/problematic/all`)
      .then(res => {
        console.log(res.data);
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
              console.log(post.title);
              return (
                <Col lg="3" md="6" sm="12" className="mb-4" key={key}>
                  <Card className="card-post card-post--1">
                    <div
                      className="card-post__image"
                      style={{
                        backgroundImage: `url(${post.photos[0].original})`
                      }}
                    >
                      <Badge
                        pill
                        className={`card-post__category bg-${post.category.id}`}
                      >
                        {post.category.title}
                      </Badge>
                      <div className="card-post__author d-flex">
                        <a
                          href="#pablo"
                          className="card-post__author-avatar"
                          style={{
                            backgroundImage: `url('${
                              post.owner._photo
                                ? post.owner._photo.original
                                : this.state.photo_user
                            }')`
                          }}
                        >
                          Written by {post.owner.firstName}{" "}
                          {post.owner.lastName}
                        </a>
                      </div>
                    </div>
                    <CardBody>
                      <h5 className="card-title">
                        <a href="#" className="text-fiord-blue">
                          {post.title}
                        </a>
                      </h5>
                      <p className="card-text d-inline-block mb-3">
                        {post.description}
                      </p>
                      <span className="text-muted">{post.creationDate}</span>
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
