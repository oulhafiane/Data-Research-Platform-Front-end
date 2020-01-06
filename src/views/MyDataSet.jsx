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
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from "reactstrap";
// nodejs library that concatenates classes
import classnames from "classnames";
import DesignSurvey from "components/Tabs/DesignSurvey";
import Analytics from "components/Tabs/Analytics";
import Data from "components/Tabs/Data";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

class MyDataSet extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    uuid: this.props.match.params.uuid,
    dataset: { parts: [{ variables: [] }] },
    extras: {},
    showGlobalWarning: false,
    uploading: false,
    iconTabs: 1,
    plainTabs: 1
  };
  saveTitle = (title, callBack) => {
    /* Need to save it in back-end */
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      name: title
    };
    Axios.patch(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}`,
      data,
      config
    )
      .then(res => {
        this.setState(
          { dataset: { ...this.state.dataset, name: title } },
          callBack
        );
      })
      .catch(error => {
        console.log(error);
        // this.setState({ showGlobalWarning: true, uploading: false });
      });
  };
  addPage = (index, callBack) => {
    let old = [...this.state.dataset.parts];
    if (this.state.dataset.parts.length === 0) {
      old = [{ variables: [] }];
    }
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      title: `Page ${index}`
    };
    Axios.post(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part`,
      data,
      config
    )
      .then(res => {
        this.setState(
          {
            dataset: {
              ...this.state.dataset,
              parts: [
                ...old,
                { title: `Page ${index}`, description: "", variables: [] }
              ]
            }
          },
          callBack
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  savePageTitle = (title, description, page, callBack) => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      title: title,
      description: description
    };
    Axios.patch(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part/${page}`,
      data,
      config
    )
      .then(res => {
        this.setState(
          {
            dataset: {
              ...this.state.dataset,
              parts:
                this.state.dataset.parts.length === 0
                  ? [{ title: title, description: description, variables: [] }]
                  : this.state.dataset.parts.map((val, key) => {
                      if (key + 1 === page) {
                        return {
                          ...val,
                          title: title,
                          description: description
                        };
                      } else return val;
                    })
            }
          },
          callBack
        );
      })
      .catch(error => {
        console.log(error);
        // this.setState({ showGlobalWarning: true, uploading: false });
      });
  };
  addQuestion = (question, page, callBack, errCallBack) => {
    /* Need to save it in back-end */
    if (!question.question || !question.name) return;
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      variables: [question]
    };
    Axios.post(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part/${page}`,
      data,
      config
    )
      .then(res => {
        this.setState(
          {
            dataset: {
              ...this.state.dataset,
              parts:
                this.state.dataset.parts.length === 0
                  ? [{ variables: [question] }]
                  : this.state.dataset.parts.map((val, key) => {
                      if (key + 1 === page) {
                        return {
                          ...val,
                          variables: [...val.variables, question]
                        };
                      } else return val;
                    })
            }
          },
          callBack
        );
      })
      .catch(error => {
        errCallBack(error.response.data.message);
        // this.setState({ showGlobalWarning: true, uploading: false });
      });
  };
  editQuestion = (question, index, page) => {
    this.setState({
      dataset: {
        ...this.state.dataset,
        parts: this.state.dataset.parts.map((val, key) => {
          if (key + 1 === page) {
            return {
              ...val,
              variables: [
                ...val.variables.map((variable, key2) => {
                  if (key2 === index) {
                    return question;
                  } else return variable;
                })
              ]
            };
          } else return val;
        })
      }
    });
  };
  removeQuestion = (index, page, callBack, errCallBack) => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.delete(
      `${DEFAULT_URL}api/current/dataset/${
        this.state.uuid
      }/part/${page}/variable/${
        this.state.dataset.parts[page - 1].variables[index].id
      }`,
      config
    )
      .then(res => {
        this.setState(
          {
            dataset: {
              ...this.state.dataset,
              parts: this.state.dataset.parts.map((val, key) => {
                if (key + 1 === page) {
                  return {
                    ...val,
                    variables: val.variables.filter(
                      (variable, key2) => key2 !== index
                    )
                  };
                } else return val;
              })
            }
          },
          callBack
        );
      })
      .catch(error => {
        errCallBack(error.response.data.message);
        // this.setState({ showGlobalWarning: true, uploading: false });
      });
  };
  saveData = e => {
    /* Need to save it in back-end */
    e.preventDefault();
    console.log(this.state.dataset);
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  componentDidMount() {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.get(`${DEFAULT_URL}api/current/dataset/${this.state.uuid}`, config)
      .then(res => {
        this.setState({
          dataset: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  componentDidUpdate() {
    if (this.state.uuid !== this.props.match.params.uuid) {
      window.location.reload();
    }
    if (
      this.state.dataset.uuid !== undefined &&
      this.state.dataset.parts.length === 0
    ) {
      const config = {
        headers: { Authorization: "bearer " + this.state.token }
      };
      let data = {
        title: "Page 1"
      };
      Axios.post(
        `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part`,
        data,
        config
      )
        .then(res => {
          this.setState({
            dataset: {
              ...this.state.dataset,
              parts: [{ title: "Page 1", description: "", variables: [] }]
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    const groupStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    };
    const groupBadgeStyles = {
      backgroundColor: "#EBECF0",
      borderRadius: "2em",
      color: "#172B4D",
      display: "inline-block",
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: "1",
      minWidth: 1,
      padding: "0.16666666666667em 0.5em",
      textAlign: "center"
    };
    return (
      <>
        {/* Page content */}
        <Container fluid style={{ marginLeft: "50px" }}>
          <Row className="justify-content-center">
            <Col lg="12">
              {/* Tabs with icons */}
              <div className="mb-3">
                <small className="text-uppercase font-weight-bold">
                  My Dataset
                </small>
              </div>
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
                      <i className="ni ni-app mr-2" />
                      Design
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
                      disabled
                    >
                      <i className="ni ni-chart-bar-32 mr-2" />
                      Data
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.iconTabs === 3}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.iconTabs === 3
                      })}
                      onClick={e => this.toggleNavs(e, "iconTabs", 3)}
                      href="#pablo"
                      role="tab"
                      disabled
                    >
                      <i className="ni ni-chart-pie-35 mr-2" />
                      Analytics
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <Card className="shadow">
                <CardBody>
                  <TabContent
                    activeTab={"iconTabs" + this.state.iconTabs}
                    style={{ margin: "0" }}
                  >
                    <TabPane tabId="iconTabs1">
                      <DndProvider backend={Backend}>
                        <DesignSurvey
                          state={this.state}
                          saveTitle={this.saveTitle}
                          addPage={this.addPage}
                          savePageTitle={this.savePageTitle}
                          addQuestion={this.addQuestion}
                          editQuestion={this.editQuestion}
                          removeQuestion={this.removeQuestion}
                          saveData={this.saveData}
                        />
                      </DndProvider>
                    </TabPane>
                    <TabPane tabId="iconTabs2">
                      <DndProvider backend={Backend}>
                        <Data state={this.state} />
                      </DndProvider>
                    </TabPane>
                    <TabPane tabId="iconTabs3">
                      <Analytics state={this.state} />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MyDataSet;
