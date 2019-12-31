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
import Axios from "axios";
import { DEFAULT_URL } from "../config";
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
    dataset: {},
    extras: {},
    showGlobalWarning: false,
    uploading: false,
    iconTabs: 1,
    plainTabs: 1
  };
  saveTitle = title => {
    /* Need to save it in back-end */
    this.setState({ dataset: { ...this.state.dataset, name: title } });
  };
  addQuestion = (question, page) => {
    /* Need to save it in back-end */
    this.setState({
      dataset: {
        ...this.state.dataset,
        parts:
          this.state.dataset.parts.length === 0
            ? [{ variables: [question] }]
            : this.state.dataset.parts.map((val, key) => {
                if (key + 1 === page) {
                  return { ...val, variables: [...val.variables, question] };
                } else return val;
              })
      }
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
        this.setState({ dataset: res.data });
      })
      .catch(error => {
        console.log(error.response);
      });
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
                          addQuestion={this.addQuestion}
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
