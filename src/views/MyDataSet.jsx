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
import Structure from "components/Tabs/Structure";
import Analytics from "components/Tabs/Analytics";
import Data from "components/Tabs/Data";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

class MyDataSet extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    dataset: {},
    types: [
      { id: 0, title: "Public" },
      { id: 1, title: "Private" }
    ],
    id_type: 0,
    extras: {},
    showGlobalWarning: false,
    uploading: false,
    iconTabs: 1,
    plainTabs: 1
  };
  onChange = e =>
    this.setState({
      dataset: { ...this.state.dataset, [e.target.name]: e.target.value },
      disabled: false
    });
  onChangeType = e => {
    e.preventDefault();
    this.setState({ id_type: e.target.id });
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  createProject = e => {
    e.preventDefault();
    if (!this.state.dataset.title) {
      this.setState({
        extras: {
          ...this.state.extras,
          title: "The title should not be blank!"
        }
      });
      return;
    }
    this.setState({ uploading: true });
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      name: this.state.dataset.title,
      description: this.state.dataset.description,
      privacy: this.state.id_type
    };
    Axios.post(`${DEFAULT_URL}api/current/dataset`, data, config)
      .then(res => {
        this.props.history.push(`/data/mydataset/${res.data.extras.uuid}`);
      })
      .catch(error => {
        this.setState({ showGlobalWarning: true, uploading: false });
      });
  };
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
    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );
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
                      Structure
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
                        <Structure state={this.state} />
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
