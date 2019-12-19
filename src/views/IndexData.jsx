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
  CardBody,
  Container,
  Row,
  Col,
  Badge,
  Modal,
  FormGroup
} from "reactstrap";
import InputTextLabel from "components/Inputs/InputLabel";
import SelectLabel from "components/Inputs/SelectLabel";
import DropDownLabel from "components/Inputs/DropDownLabel";

class IndexData extends React.Component {
  state = {
    dataset: {},
    types: [
      { id: 0, value: "Public" },
      { id: 1, value: "Private" }
    ],
    id_type: 0
  };
  onChangeType = e => {
    e.preventDefault();
    this.setState({ id_domain: e.target.id, id_category: 0 });
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  createProject = e => {
    e.preventDefault();
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
          <Row className="row-grid">
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                    <i className="ni ni-check-bold" />
                  </div>
                  <h6 className="text-primary text-uppercase">
                    Create Project
                  </h6>
                  <p className="description mt-3">
                    Create Dataset, import data or create survey, clean up data,
                    get data summary, analyze the data, create machine learning
                    model
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
                    Create Project
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.defaultModal}
                    toggle={() => this.toggleModal("defaultModal")}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-default">
                        Create Project
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
                      <InputTextLabel
                        id="title"
                        placeholder="Title"
                        type="text"
                        val={this.state.dataset.title}
                        onChange={this.onChange}
                      />
                      <DropDownLabel
                        id="privacy"
                        name="Privacy"
                        placeholder={this.state.types[this.state.id_type].value}
                        type="text"
                        val={this.state.types}
                        onChange={this.onChangeType}
                      />
                      <InputTextLabel
                        id="description"
                        placeholder="Description"
                        type="textarea"
                        rows="5"
                        val={this.state.dataset.description}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <Button
                        color="primary"
                        type="button"
                        onClick={this.filter}
                      >
                        create
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
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                    <i className="ni ni-istanbul" />
                  </div>
                  <h6 className="text-success text-uppercase">
                    Build Something
                  </h6>
                  <p className="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <Badge color="success" pill className="mr-1">
                      business
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      vision
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      success
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="success"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Learn more
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                    <i className="ni ni-planet" />
                  </div>
                  <h6 className="text-warning text-uppercase">
                    Prepare Launch
                  </h6>
                  <p className="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <Badge color="warning" pill className="mr-1">
                      marketing
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      product
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      launch
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="warning"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Learn more
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="row-grid">
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                    <i className="ni ni-check-bold" />
                  </div>
                  <h6 className="text-primary text-uppercase">
                    Download Argon
                  </h6>
                  <p className="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <Badge color="primary" pill className="mr-1">
                      design
                    </Badge>
                    <Badge color="primary" pill className="mr-1">
                      system
                    </Badge>
                    <Badge color="primary" pill className="mr-1">
                      creative
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="primary"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Learn more
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                    <i className="ni ni-istanbul" />
                  </div>
                  <h6 className="text-success text-uppercase">
                    Build Something
                  </h6>
                  <p className="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <Badge color="success" pill className="mr-1">
                      business
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      vision
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      success
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="success"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Learn more
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                    <i className="ni ni-planet" />
                  </div>
                  <h6 className="text-warning text-uppercase">
                    Prepare Launch
                  </h6>
                  <p className="description mt-3">
                    Argon is a great free UI package based on Bootstrap 4 that
                    includes the most important components and features.
                  </p>
                  <div>
                    <Badge color="warning" pill className="mr-1">
                      marketing
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      product
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      launch
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="warning"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Learn more
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
