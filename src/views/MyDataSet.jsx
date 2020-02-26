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
import classnames from 'classnames'
import DesignSurvey from 'components/Tabs/DesignSurvey'
import Tokens from 'components/Tabs/Tokens'
import Data from 'components/Tabs/Data'
import Analytics from 'components/Tabs/Analytics'
import MachineLearinng from 'components/Tabs/MachineLearinng'

class MyDataSet extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    uuid: this.props.match.params.uuid,
    dataset: { parts: [{ variables: [] }] },
    variables: null,
    data: [],
    tokens: { tokens: [] },
    extras: {},
    showGlobalWarning: false,
    uploading: false,
    iconTabs: localStorage.getItem(this.props.match.params.uuid)
      ? parseInt(localStorage.getItem(this.props.match.params.uuid))
      : 1,
    plainTabs: 1,
    canvasGrid: undefined
  };
  sendGridToParent = grid => {
    console.log(grid);
    this.setState({ canvasGrid: grid });
  };
  saveTitle = (title, callBack, errCallBack) => {
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
        if (error.response) errCallBack(error.response.data.message);
        else errCallBack("No Internet Connection!");
      });
  };
  addPage = (index, callBack, errCallBack) => {
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
                {
                  id: res.data.extras.id,
                  title: `Page ${index}`,
                  description: "",
                  variables: []
                }
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
  savePageTitle = (title, description, page, callBack, errCallBack) => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      title: title,
      description: description
    };
    Axios.patch(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part/${
      this.state.dataset.parts[page - 1].id
      }`,
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
        if (error.response) errCallBack(error.response.data.message);
        else errCallBack("No Internet Connection!");
      });
  };
  addVariables = (question, page, callBack, errCallBack) => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      variables: [question]
    };
    Axios.post(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part/${
      this.state.dataset.parts[page - 1].id
      }`,
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
                        variables: [
                          ...val.variables,
                          ...res.data.extras.variables
                        ]
                      };
                    } else return val;
                  })
            }
          },
          callBack
        );
      })
      .catch(error => {
        if (error.response) errCallBack(error.response.data.message);
        else errCallBack("No Internet Connection!");
      });
  };

  addQuestion = (options, question, page, callBack, errCallBack) => {
    // Add options of mutiple choice to Question Object
    if (options !== undefined && options !== null && options.length > 0) {
      options = options.filter((elem, index) => {
        if (elem.value.length > 0) return true;
        else return false;
      });
      options = options.map((elem, index) => {
        return elem.value;
      });
      if (options && options.length > 0) {
        question = { ...question, options };
      }
    }
    /* Need to save it in back-end */
    if (!question.question || !question.name) {
      errCallBack("Question and name must not be empty!");
      return;
    }
    if (undefined === this.state.dataset.parts[page - 1]) {
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
          this.setState(
            {
              dataset: {
                ...this.state.dataset,
                parts: [
                  {
                    id: res.data.extras.id,
                    title: "Page 1",
                    description: "",
                    variables: []
                  }
                ]
              }
            },
            () => {
              this.addVariables(question, page, callBack, errCallBack);
            }
          );
        })
        .catch(error => {
          if (error.response) errCallBack(error.response.data.message);
          else errCallBack("Cannot create page!");
        });
      return;
    }
    this.addVariables(question, page, callBack, errCallBack);
  };

  editQuestion = (options, question, index, page, callBack, errCallBack) => {
    if (options !== undefined && options !== null && options.length > 0) {
      options = options.filter((elem, index) => {
        if (elem.value.length > 0) return true;
        else return false;
      });
      options = options.map((elem, index) => {
        return elem.value;
      });
      if (options && options.length > 0) {
        question = { ...question, options };
      }
    }

    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.patch(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part/${
      this.state.dataset.parts[page - 1].id
      }/variable/${this.state.dataset.parts[page - 1].variables[index].id}`,
      question,
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
          },
          callBack
        );
      })
      .catch(error => {
        if (error.response) errCallBack(error.response.data.message);
        else errCallBack("No Internet Connection!");
      });
  };
  removeQuestion = (index, page, callBack, errCallBack) => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.delete(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/part/${
      this.state.dataset.parts[page - 1].id
      }/variable/${this.state.dataset.parts[page - 1].variables[index].id}`,
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
        if (error.response) errCallBack(error.response.data.message);
        else errCallBack("No Internet Connection!");
      });
  };
  publishSurvey = e => this.toggleNavs(e, "iconTabs", 2);
  gotoTokenPage = page => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.get(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/token?page=${page}`,
      config
    )
      .then(res => {
        this.setState({
          tokens: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  refreshTokens = () => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.get(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/token`,
      config
    )
      .then(res => {
        this.setState({
          tokens: res.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    localStorage.setItem(this.props.match.params.uuid, index);
    if (index === 2) this.refreshTokens();
    if (index === 3) {
      const canvas = this.state.canvasGrid.canvas;
      canvas.style.width = "auto";
      canvas.style.height = "auto";
    }
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
        // for machine learning section
        let variables = []
        res.data.parts.map(elem => {
          elem.variables.map(elem => {
            variables = [...variables, { value: elem.name, label: elem.name }]
          })
        })
        this.setState({
          dataset: res.data,
          variables: variables
        })
      })
      .catch(error => {
        /* Need to check the owner */
        console.log(error.response);
      });

    Axios.get(
      `${DEFAULT_URL}api/current/dataset/${this.state.uuid}/data`,
      config
    )
      .then(res => {
        console.log(res.data);
        this.setState({
          data: res.data ? (res.data.data ? res.data.data : []) : []
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
  }
  render() {
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
                      href="#design"
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
                      href="#tokens"
                      role="tab"
                    >
                      <i className="ni ni-chat-round mr-2" />
                      Collect
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.iconTabs === 3}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.iconTabs === 3
                      })}
                      onClick={e => this.toggleNavs(e, "iconTabs", 3)}
                      href="#data"
                      role="tab"
                    >
                      <i className="ni ni-chart-bar-32 mr-2" />
                      Data
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.iconTabs === 4}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.iconTabs === 4
                      })}
                      onClick={e => this.toggleNavs(e, "iconTabs", 4)}
                      href="#analytics"
                      role="tab"
                    >
                      <i className="ni ni-chart-pie-35 mr-2" />
                      Analytics
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      aria-selected={this.state.iconTabs === 5}
                      className={classnames("mb-sm-3 mb-md-0", {
                        active: this.state.iconTabs === 5
                      })}
                      onClick={e => this.toggleNavs(e, "iconTabs", 5)}
                      href="#prediction"
                      role="tab"
                    >
                      <i className="ni ni-chart-bar-32 mr-2" />
                      Machine Learning
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
                      <DesignSurvey
                        state={this.state}
                        saveTitle={this.saveTitle}
                        addPage={this.addPage}
                        savePageTitle={this.savePageTitle}
                        addQuestion={this.addQuestion}
                        editQuestion={this.editQuestion}
                        removeQuestion={this.removeQuestion}
                        publishSurvey={this.publishSurvey}
                      />
                    </TabPane>
                    <TabPane tabId="iconTabs2">
                      <Tokens
                        state={this.state}
                        refreshTokens={this.refreshTokens}
                        gotoTokenPage={this.gotoTokenPage}
                      />
                    </TabPane>
                    <TabPane tabId="iconTabs3">
                      <Data
                        state={this.state}
                        sendGridToParent={this.sendGridToParent}
                      />
                    </TabPane>
                    <TabPane tabId="iconTabs4">
                      <Analytics state={this.state} />
                    </TabPane>
                    <TabPane tabId="iconTabs5">
                      <MachineLearinng
                        state={this.state}
                        refreshTokens={this.refreshTokens}
                        gotoTokenPage={this.gotoTokenPage}
                        variables={this.state.variables}
                        uuid={this.state.uuid}
                      />
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
