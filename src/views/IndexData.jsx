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
  Button,
  Card,
  CardImg,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  Modal,
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
// nodejs library that concatenates classes
import classnames from "classnames";
import InputTextLabel from "components/Inputs/InputLabel";
import DropDownLabel from "components/Inputs/DropDownLabel";
import DropzoneExcel from "components/Dropzone/DropzoneExcel";
import Axios from "axios";
import { DEFAULT_URL } from "../config";

class IndexData extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    dataset: {},
    fileExcel: {},
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
  toBase64 = file => {
    let fileReader = new FileReader();
    fileReader.onload = e => {
      this.setState({
        fileExcel: {
          file: file,
          b64: fileReader.result
        }
      });
    };
    fileReader.readAsDataURL(file);
  };
  onFilesAdded = file => {
    this.setState({ fileExcel: {} });
    this.toBase64(file);
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
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
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
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
    this.setState({ uploading: true, extras: {}, errorMessage: undefined });
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      name: this.state.dataset.title,
      description: this.state.dataset.description,
      privacy: this.state.id_type
    };
    if (this.state.iconTabs === 2 && this.state.fileExcel.file) {
      data.fileExcel = { file: this.state.fileExcel.b64 };
    }
    Axios.post(`${DEFAULT_URL}api/current/dataset`, data, config)
      .then(res => {
        this.props.history.push(`/data/mydataset/${res.data.extras.uuid}`);
      })
      .catch(error => {
        this.setState({
          showGlobalWarning: true,
          uploading: false,
          errorMessage: error.response
            ? error.response.data
              ? error.response.data.message
                ? error.response.data.message
                : undefined
              : undefined
            : undefined,
          extras: error.response
            ? error.response.data
              ? error.response.data.extras
                ? error.response.data.extras
                : {}
              : {}
            : {}
        });
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
    return (
      <>
        {/* Page content */}
        <Container fluid style={{ marginLeft: "50px" }}>
          <Row className="row-grid">
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardImg
                  alt="..."
                  src={require("assets/img/banner/newsurvey.jpg")}
                  top
                  style={{ height: "30vh" }}
                />
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                    <i className="ni ni-check-bold" />
                  </div>
                  <h6 className="text-primary text-uppercase">
                    Create Dataset
                  </h6>
                  <p className="description mt-3" style={{ height: "12vh" }}>
                    Create survey or import data, clean the data, get the data
                    summary, analyze the data, and, create machine learning
                    model.
                  </p>
                  <div>
                    <Badge color="primary" pill className="mr-1">
                      Dataset
                    </Badge>
                    <Badge color="primary" pill className="mr-1">
                      Survey
                    </Badge>
                    <Badge color="primary" pill className="mr-1">
                      Analysis
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="primary"
                    onClick={() => this.toggleModal("defaultModal")}
                  >
                    Create Dataset
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.defaultModal}
                    toggle={() => this.toggleModal("defaultModal")}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-default">
                        Create Dataset
                      </h6>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("defaultModal")}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="nav-wrapper">
                        <InputTextLabel
                          id="title"
                          placeholder="Title"
                          type="text"
                          val={this.state.dataset.title}
                          onChange={this.onChange}
                          stateError={this.state.extras.name !== undefined}
                          errorMessage={this.state.extras.name}
                        />
                        <DropDownLabel
                          id="privacy"
                          name="Privacy"
                          placeholder={
                            this.state.types[this.state.id_type].title
                          }
                          type="text"
                          val={this.state.types}
                          onChange={this.onChangeType}
                        />
                        <InputTextLabel
                          id="description"
                          placeholder="Description"
                          type="textarea"
                          rows={this.state.iconTabs === 2 ? "2" : "5"}
                          val={this.state.dataset.description}
                          onChange={this.onChange}
                          value
                        />
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
                              Create Survey
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
                              <i className="ni ni-chart-bar-32 mr-2" />
                              Import Data
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>
                      {this.state.iconTabs == 2 ? (
                        <Card className="shadow">
                          <CardBody>
                            <TabContent
                              activeTab={"iconTabs" + this.state.iconTabs}
                              style={{ margin: "0" }}
                            >
                              <TabPane tabId="iconTabs1"></TabPane>
                              <TabPane tabId="iconTabs2">
                                <DropzoneExcel
                                  onFilesAdded={this.onFilesAdded}
                                  fileExcel={this.state.fileExcel}
                                />
                              </TabPane>
                            </TabContent>
                          </CardBody>
                        </Card>
                      ) : null}
                      {this.state.showGlobalWarning ? (
                        <Alert color="danger" style={{ marginTop: "5px" }}>
                          <strong>Error!</strong>{" "}
                          {this.state.iconTabs === 2
                            ? this.state.errorMessage !== undefined
                              ? this.state.errorMessage
                              : "An error occured!"
                            : "An error occured!"}
                        </Alert>
                      ) : null}
                    </div>
                    <div className="modal-footer">
                      <Button
                        color="primary"
                        type="button"
                        onClick={this.createProject}
                      >
                        {this.state.uploading ? (
                          <React.Fragment>
                            <i className="fas fa-spin fa-spinner"></i>{" "}
                            Uploading...
                          </React.Fragment>
                        ) : (
                          "Create"
                        )}
                      </Button>
                      <Button
                        className="ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("defaultModal")}
                      >
                        Close
                      </Button>
                    </div>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardImg
                  alt="..."
                  src={require("assets/img/banner/mysurveys.jpg")}
                  top
                  style={{ height: "30vh" }}
                />
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                    <i className="ni ni-istanbul" />
                  </div>
                  <h6 className="text-success text-uppercase">My Datasets</h6>
                  <p className="description mt-3" style={{ height: "12vh" }}>
                    Consult and edit all your datasets.
                  </p>
                  <div>
                    <Badge color="success" pill className="mr-1">
                      Dataset
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      Survey
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      Analysis
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="success"
                    href="/data/mydatasets"
                  >
                    My Datasets
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardImg
                  alt="..."
                  src={require("assets/img/banner/publicdatasets.jpg")}
                  top
                  style={{ height: "30vh" }}
                />
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                    <i className="ni ni-planet" />
                  </div>
                  <h6 className="text-warning text-uppercase">
                    Public Datasets
                  </h6>
                  <p className="description mt-3" style={{ height: "12vh" }}>
                    Consult datasets shared by members of our community
                  </p>
                  <div>
                    <Badge color="warning" pill className="mr-1">
                      Dataset
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      Survey
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      Analysis
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="warning"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Public Datasets
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default IndexData;
