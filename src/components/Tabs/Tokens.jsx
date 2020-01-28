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
import Axios from "axios";
import { DEFAULT_URL } from "../../config";
import DateTime from "react-datetime";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Modal,
  Alert,
  Button,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col
} from "reactstrap";
import DropDownLabel from "components/Inputs/DropDownLabel";
import CreatableSelectLabel from "components/Inputs/CreatableSelectLabel";
import QRCode from "qrcode.react";

const createOption = label => ({
  label,
  value: label
});

class Tokens extends React.Component {
  state = {
    currentPage: 1,
    newToken: {},
    types: [
      { id: 0, title: "Public" },
      { id: 1, title: "Private" }
    ],
    id_type: "0",
    emailsSelected: [],
    inputValue: "",
    showGlobalWarning: false,
    creating: false,
    defaultModal: false,
    qrCodeReady: false,
    toDelete: null
  };
  handleChange = (value, actionMeta) => {
    this.setState({ emailsSelected: value ? value : [] });
  };

  handleInputChange = inputValue => {
    this.setState({ inputValue });
  };

  handleKeyDown = event => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        this.setState({
          inputValue: "",
          emailsSelected: [
            ...this.state.emailsSelected,
            createOption(inputValue)
          ]
        });
        event.preventDefault();
    }
  };
  onChangeDate = date => {
    this.setState({ newToken: { ...this.state.newToken, exp: date.format() } });
  };
  toggleModal = state => {
    this.setState({
      newToken: {},
      [state]: !this.state[state]
    });
  };
  downloadToken = () => {
    const canvas = document.getElementById("canvasQrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  getToken = uuidt => {
    const config = {
      headers: { Authorization: "bearer " + this.props.state.token }
    };
    Axios.get(
      `${DEFAULT_URL}api/current/dataset/${this.props.state.uuid}/token/${uuidt}`,
      config
    )
      .then(res => {
        this.setState({
          qrCode: res.data.token,
          qrCodeReady: true
        });
      })
      .catch(error => {
        this.setState({
          showGlobalWarning: true,
          error: error.response
            ? error.response.data
              ? error.response.data.message
                ? error.response.data.message
                : "An error occured!"
              : "An error occured!"
            : "No Internet Connection!",
          creating: false
        });
      });
  };
  deleteToken = uuidt => {
    if (null === uuidt) return;
    const config = {
      headers: { Authorization: "bearer " + this.props.state.token }
    };
    Axios.delete(
      `${DEFAULT_URL}api/current/dataset/${this.props.state.uuid}/token/${uuidt}`,
      config
    )
      .then(res => {
        this.props.refreshTokens();
        this.setState({ toDelete: null, notificationModal: false });
      })
      .catch(error => {
        this.setState({
          showGlobalWarning: true,
          error: error.response
            ? error.response.data
              ? error.response.data.message
                ? error.response.data.message
                : "An error occured!"
              : "An error occured!"
            : "No Internet Connection!",
          creating: false
        });
      });
  };
  createToken = () => {
    this.setState({
      creating: true,
      showGlobalWarning: false,
      error: undefined
    });
    const config = {
      headers: { Authorization: "bearer " + this.props.state.token }
    };
    const data = {
      privacy: parseInt(this.state.id_type),
      ...this.state.newToken
    };
    Axios.post(
      `${DEFAULT_URL}api/current/dataset/${this.props.state.uuid}/token`,
      data,
      config
    )
      .then(res => {
        this.props.refreshTokens();
        this.setState({
          qrCode: res.data.token,
          qrCodeReady: true,
          creating: false,
          showGlobalWarning: false,
          error: undefined
        });
        this.toggleModal("defaultModal");
      })
      .catch(error => {
        this.setState({
          showGlobalWarning: true,
          error: error.response
            ? error.response.data
              ? error.response.data.message
                ? error.response.data.message
                : "An error occured!"
              : "An error occured!"
            : "No Internet Connection!",
          creating: false
        });
      });
  };
  onChangeType = e => {
    e.preventDefault();
    this.setState({ id_type: e.target.id });
  };
  componentDidMount() {
    this.props.refreshTokens();
  }
  render() {
    const { state, gotoTokenPage } = this.props;
    let paginations = [];
    for (let i = 0; i < state.tokens.nbPages; i++) {
      paginations.push(
        <PaginationItem
          key={i}
          className={i + 1 === state.tokens.currentPage ? "active" : ""}
        >
          <PaginationLink
            href="#pablo"
            onClick={e => {
              e.preventDefault();
              this.props.gotoTokenPage(i + 1);
            }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return (
      <>
        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={this.state.notificationModal}
          toggle={() => this.toggleModal("notificationModal")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-notification">
              Your attention is required
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("notificationModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="py-3 text-center">
              <i className="ni ni-bell-55 ni-3x" />
              <h4 className="heading mt-4">
                Are you sure you want to permanently delete this token ?
              </h4>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              className="btn-white"
              color="default"
              type="button"
              onClick={() => this.deleteToken(this.state.toDelete)}
            >
              Yes
            </Button>
            <Button
              className="text-white ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() =>
                this.setState({ toDelete: null }, () =>
                  this.toggleModal("notificationModal")
                )
              }
            >
              Close
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.qrCodeReady && this.state.qrCode}
          toggle={() => this.toggleModal("qrCodeReady")}
          style={{ width: "85%" }}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Generated QR Code
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("qrCodeReady")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            {this.state.qrCode ? (
              <QRCode
                id="canvasQrCode"
                value={this.state.qrCode}
                size="400"
                style={{
                  width: "50vw",
                  height: "50vw",
                  maxWidth: "450px",
                  maxHeight: "450px",
                  display: "table",
                  margin: "0 auto"
                }}
              />
            ) : null}
          </div>
          <div className="modal-footer">
            <Button color="primary" type="button" onClick={this.downloadToken}>
              {this.state.downloading ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Downloading...
                </React.Fragment>
              ) : (
                "Download"
              )}
            </Button>
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("qrCodeReady")}
            >
              Close
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.defaultModal}
          toggle={() => this.toggleModal("defaultModal")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Create New Token
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
            <DropDownLabel
              id="privacy"
              name="Privacy"
              placeholder={this.state.types[this.state.id_type].title}
              type="text"
              val={this.state.types}
              onChange={this.onChangeType}
            />
            {this.state.id_type === "1" ? (
              <CreatableSelectLabel
                id="emails"
                placeholder="Emails"
                selected={this.state.emailsSelected}
                val={this.state.inputValue}
                onChange={this.handleChange}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                menuIsOpen={false}
              />
            ) : null}
            <small className="d-block text-uppercase font-weight-bold mb-3">
              Expiration Date
            </small>
            <FormGroup className="focused">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <DateTime
                  inputProps={{
                    placeholder: "Click Here To Choose Date & Time"
                  }}
                  onChange={this.onChangeDate}
                />
              </InputGroup>
            </FormGroup>
            {this.state.showGlobalWarning ? (
              <Alert color="danger">
                <strong>Error!</strong>{" "}
                {this.state.error ? this.state.error : "An error occured!"}
              </Alert>
            ) : null}
          </div>
          <div className="modal-footer">
            <Button color="primary" type="button" onClick={this.createToken}>
              {this.state.creating ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Creating...
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
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Survey Tokens</h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Uuid</th>
                <th scope="col">Privacy</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Expiration Date</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {state.tokens.tokens.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.uuid}</td>
                    <td>{val.privacy === 0 ? "Public" : "Private"}</td>
                    <td>{val.creation_date}</td>
                    <td>{val.expiration_date}</td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={() => this.getToken(val.uuid)}
                          >
                            QR Code
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() =>
                              this.setState({ toDelete: val.uuid }, () =>
                                this.toggleModal("notificationModal")
                              )
                            }
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <Row>
              <Col lg="6">
                <nav aria-label="...">
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        // style={{ backgroundColor: "#2dce89", color: "#fff" }}
                        onClick={e => {
                          e.preventDefault();
                          this.toggleModal("defaultModal");
                        }}
                      >
                        <i className="ni ni-fat-add" />
                        <span className="sr-only">+</span>
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem
                      style={{ marginLeft: "5px", marginTop: "6px" }}
                    >
                      Total: {state.tokens.itemsCount}
                    </PaginationItem>
                  </Pagination>
                </nav>
              </Col>
              <Col lg="6">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          gotoTokenPage(1);
                        }}
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {paginations}
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          gotoTokenPage(state.tokens.nbPages);
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </>
    );
  }
}

export default Tokens;
