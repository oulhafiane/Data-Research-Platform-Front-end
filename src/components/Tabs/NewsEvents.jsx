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
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col
} from "reactstrap";

class NewsEvents extends React.Component {
  state = {
    iconTabs: 1,
    plainTabs: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    return (
      <>
        <Row className="justify-content-center">
          <Col lg="12">
            {/* Tabs with icons */}
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-world mr-2" />
                    News
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-calendar-grid-58 mr-2" />
                    Events
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <Row>
                      <Col md="6">
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#1">
                                <span className="date">
                                  <span>18</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#2">Building In WebCorpCo CMS 8</a>
                              </h4>
                              <p className="post">
                                Learn about all of the possibilities of web
                                design in our latest CMS release.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#3">
                                <span className="date">
                                  <span>22</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#4">WebCorpCo Named To Inc. 5000</a>
                              </h4>
                              <p className="post">
                                Inc. magazine today ranked WebCorpCo as the
                                1,870th fastest growing company on the 34th
                                annual Inc. 5000.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#5">
                                <span className="date">
                                  <span>9</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#6">
                                  7 Critical Factors When Choosing A CMS
                                </a>
                              </h4>
                              <p className="post">
                                Finding a solution that can be tailored to
                                support the needs of your business is more
                                important than ever.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#7">
                                <span className="date">
                                  <span>18</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#8">
                                  What Is A Content Management System
                                </a>
                              </h4>
                              <p className="post">
                                So many acronyms that most of us know a brief
                                amount about, if at all, let alone the meaning
                                of those three little letters we hear so often.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-center">
                          <Link to="/default/events" className="btn btn-event">
                            SEE ALL NEWS
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <Row>
                      <Col md="6">
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#9">
                                <span className="date">
                                  <span>29</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#10">Building In WebCorpCo CMS 8</a>
                              </h4>
                              <p className="post">
                                Learn about all of the possibilities of web
                                design in our latest CMS release.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#11">
                                <span className="date">
                                  <span>22</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#12">WebCorpCo Named To Inc. 5000</a>
                              </h4>
                              <p className="post">
                                Inc. magazine today ranked WebCorpCo as the
                                1,870th fastest growing company on the 34th
                                annual Inc. 5000.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#13">
                                <span className="date">
                                  <span>12</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#14">
                                  7 Critical Factors When Choosing A CMS
                                </a>
                              </h4>
                              <p className="post">
                                Finding a solution that can be tailored to
                                support the needs of your business is more
                                important than ever.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="blogPost--small">
                          <div className="media">
                            <span className="pull-left">
                              <a href="#15">
                                <span className="date">
                                  <span>10</span> <small>Nov</small>
                                </span>
                              </a>
                            </span>
                            <div className="media-body">
                              <h4 className="media-heading title-post">
                                <a href="#16">
                                  What Is A Content Management System
                                </a>
                              </h4>
                              <p className="post">
                                So many acronyms that most of us know a brief
                                amount about, if at all, let alone the meaning
                                of those three little letters we hear so often.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="text-center">
                          <Link to="/default/events" className="btn btn-event">
                            SEE ALL EVENTS
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default NewsEvents;
