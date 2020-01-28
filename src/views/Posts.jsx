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
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Badge,
  Col
} from "reactstrap";
import Menu from "components/Menus/Menu";

class Profile extends React.Component {
  state = {
    photo_user: require("assets/img/theme/user-profile.png"),
    photo_default: require("assets/img/theme/profile-cover.jpg"),
    token: localStorage.getItem("token"),
    data: [],
    scrolling: false,
    limit: 12,
    currentPage: 1,
    lastItem: 0,
    totalPages: null,
    itemsCount: null,
    sortyBy: "VOTES",
    orderBy: "DESC",
    filter: false
  };

  loadProblematics = () => {
    Axios.get(
      `${DEFAULT_URL}api/problematic/all?limit=${this.state.limit}&page=${this.state.currentPage}`
    )
      .then(res => {
        this.setState(prevState => ({
          data: [...prevState.data, ...res.data.problematics],
          totalPages: res.data.nbPages,
          itemsCount: res.data.itemsCount,
          lastItem: prevState.lastItem + this.state.limit,
          currentPage: prevState.currentPage + 1,
          scrolling: false
        }));
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  resetAndFilterProblematics = (sortBy, orderBy, data) => {
    this.setState(
      {
        currentPage: 1,
        lastItem: 0,
        totalPages: null,
        itemsCount: null,
        filter: true,
        sortBy: sortBy,
        orderBy: orderBy,
        filterData: data,
        data: []
      },
      this.filterProblematics
    );
  };

  filterProblematics = () => {
    Axios.patch(
      `${DEFAULT_URL}api/public/problematic/filter?limit=${this.state.limit}&page=${this.state.currentPage}&orderBy=${this.state.sortBy}&order=${this.state.orderBy}`,
      this.state.filterData
    )
      .then(res => {
        this.setState(prevState => ({
          data: [...prevState.data, ...res.data.problematics],
          totalPages: res.data.nbPages,
          itemsCount: res.data.itemsCount,
          lastItem: prevState.lastItem + this.state.limit,
          currentPage: prevState.currentPage + 1,
          scrolling: false
        }));
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  handleScroll = () => {
    if (this.state.scrolling) return;
    if (this.state.lastItem === 0) return;
    let lastCol = document.querySelector(`#col-${this.state.lastItem}`);
    if (!lastCol) return;
    let lastColOffset = lastCol.offsetTop + lastCol.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (
      pageOffset > lastColOffset &&
      this.state.currentPage <= this.state.totalPages
    ) {
      this.setState({ scrolling: true });
      this.state.filter ? this.filterProblematics() : this.loadProblematics();
    }
  };

  componentDidMount() {
    this.loadProblematics();
    this.scrollListener = window.addEventListener("scroll", e => {
      this.handleScroll();
    });
  }

  render() {
    return (
      <>
        <Container fluid className="main-content-container px-4">
          {/* First Row of Posts */}
          <Menu {...this.props} onFilter={this.resetAndFilterProblematics} />
          <Row>
            {this.state.data.map((post, key) => {
              return (
                <Col
                  id={`col-${key + 1}`}
                  lg="3"
                  md="6"
                  sm="12"
                  className="mb-4"
                  key={key}
                >
                  <Card className="card-post card-post--1">
                    <div
                      onClick={() =>
                        this.props.history.push(`/default/posts/${post[0].id}`)
                      }
                      className="card-post__image"
                      style={{
                        cursor: "pointer",
                        backgroundImage: `url(${
                          post[0]
                            ? post[0].photos[0]
                              ? post[0].photos[0].img
                                ? post[0].photos[0].img
                                : this.state.photo_default
                              : this.state.photo_default
                            : this.state.photo_default
                        })`
                      }}
                    >
                      <Badge
                        pill
                        className={`card-post__category bg-${
                          post["votes"] > 0
                            ? "success"
                            : post["votes"] < 0
                            ? "danger"
                            : ""
                        }`}
                      >
                        {post["votes"] + " Votes"}
                      </Badge>
                      <div className="card-post__author d-flex">
                        <Link
                          // to={`/default/profile/${post[0].owner.uuid}`}
                          to="#"
                          className="card-post__author-avatar"
                          style={{
                            width: "60px",
                            height: "60px",
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
                    <CardHeader className="text-center border-0 pt-4 pb-4">
                      <div className="d-flex justify-content-between"></div>
                      <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">
                          <Link to={`/default/profile/${post[0].owner.uuid}`}>
                            {post[0].owner.firstName} {post[0].owner.lastName}
                          </Link>
                        </span>
                        <small className="text-muted">
                          {post[0].creationDate}
                        </small>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <h5
                        className="card-title"
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden"
                        }}
                      >
                        <Link
                          to={`/default/posts/${post[0].id}`}
                          className="text-fiord-blue"
                        >
                          {post[0].title}
                        </Link>
                      </h5>
                      <h6
                        style={{
                          marginTop: "-15px",
                          marginBottom: "20px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden"
                        }}
                      >
                        {post[0].category.title}
                      </h6>
                      <p className="card-text mb-3 post">
                        {post[0].description}
                      </p>
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
