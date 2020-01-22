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
  Container,
  CardHeader,
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  Alert,
  Button
} from "reactstrap";
import Axios from "axios";
import { DEFAULT_URL } from "../config";
import InputTextLabel from "components/Inputs/InputLabel";
import DropDownLabel from "components/Inputs/DropDownLabel";
import { Link } from "react-router-dom";

class MyDataSets extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    dataset: {},
    datasets: [],
    types: [
      { id: 0, title: "Public" },
      { id: 1, title: "Private" }
    ],
    id_type: 0,
    extras: {},
    showGlobalWarning: false,
    uploading: false,
    iconTabs: 1,
    plainTabs: 1,
    scrolling: false,
    limit: 12,
    currentPage: 1,
    lastItem: 0,
    totalPages: null,
    itemsCount: null,
    filter: false
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
  loadDatasets = () => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.get(
      `${DEFAULT_URL}api/current/dataset?limit=${this.state.limit}&page=${this.state.currentPage}/`,
      config
    )
      .then(res => {
        this.setState(prevState => ({
          datasets: [...prevState.datasets, ...res.data.datasets],
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
  // handleScroll = () => {
  //   if (this.state.scrolling) return;
  //   if (this.state.lastItem === 0) return;
  //   let lastCol = document.querySelector(`#col-${this.state.lastItem}`);
  //   if (!lastCol) return;
  //   let lastColOffset = lastCol.offsetTop + lastCol.clientHeight;
  //   let pageOffset = window.pageYOffset + window.innerHeight;
  //   if (
  //     pageOffset > lastColOffset &&
  //     this.state.currentPage <= this.state.totalPages
  //   ) {
  //     this.setState({ scrolling: true });
  //     this.loadDatasets();
  //   }
  // };
  componentDidMount() {
    this.loadDatasets();
    // this.scrollListener = window.addEventListener("scroll", e => {
    //   this.handleScroll();
    // });
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
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">My Datasets</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">UUID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Privacy</th>
                  <th scope="col">Creation Date</th>
                  <th scope="col">Survey</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {this.state.datasets.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        <Link to={`/data/mydataset/${value.uuid}`}>
                          {value.uuid}
                        </Link>
                      </td>
                      <td>{value.name}</td>
                      <td>{value.description}</td>
                      <td>{value.privacy === 0 ? "PRIVATE" : "PUBLIC"}</td>
                      <td style={{ textAlign: "center" }}>
                        {value.creationDate}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {value.parts.length > 0 ? "YES" : "NO"}
                      </td>
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
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
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
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={() => this.toggleModal("defaultModal")}
                    >
                      <i className="ni ni-fat-add" />
                      <span className="sr-only">+</span>
                    </PaginationLink>
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
                        <InputTextLabel
                          id="title"
                          placeholder="Title"
                          type="text"
                          val={this.state.dataset.title}
                          onChange={this.onChange}
                          stateError={this.state.extras.title !== undefined}
                          errorMessage={this.state.extras.title}
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
                          rows="5"
                          val={this.state.dataset.description}
                          onChange={this.onChange}
                          value
                        />
                        {this.state.showGlobalWarning ? (
                          <Alert color="danger">
                            <strong>Error!</strong> An error occured!
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
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </Container>
      </>
    );
  }
}

export default MyDataSets;
