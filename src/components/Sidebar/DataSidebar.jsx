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
/*eslint-disable*/
import React from "react";
import { withRouter } from "react-router";
import ClickOutside from "../Other/ClickOutSide";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import Axios from "axios";
import { DEFAULT_URL } from "../../config";
// reactstrap components
import { Modal, Alert, Button } from "reactstrap";
import InputTextLabel from "components/Inputs/InputLabel";
import DropDownLabel from "components/Inputs/DropDownLabel";

class DataSidebar extends React.Component {
  state = {
    expanded: false,
    token: localStorage.getItem("token"),
    datasets: [],
    dataset: {},
    extras: {},
    types: [
      { id: 0, title: "Public" },
      { id: 1, title: "Private" }
    ],
    id_type: 0,
    uploading: false
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
    Axios.get(`${DEFAULT_URL}api/current/dataset?limit=50/`, config)
      .then(res => {
        this.setState(prevState => ({
          datasets: [...prevState.datasets, ...res.data.datasets]
        }));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  componentDidMount() {
    this.loadDatasets();
  }
  render() {
    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({ expanded: false });
        }}
      >
        <SideNav
          className="navbar-vertical fixed-left navbar-light bg-default"
          expanded={this.state.expanded}
          onToggle={expanded => {
            this.setState({ expanded });
          }}
          onSelect={selected => {
            if (selected === "add") {
              this.toggleModal("defaultModal");
              return;
            }
            const to = "/" + selected;
            if (location.pathname !== to) {
              this.props.history.push(to);
            }
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="data/index">
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <i
                  className="fa fa-fw fa-database"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>My Datasets</NavText>
              {this.state.datasets.map((value, key) => {
                return (
                  <NavItem key={key} eventKey={`data/mydataset/${value.uuid}`}>
                    <NavText>{value.name}</NavText>
                  </NavItem>
                );
              })}
              <NavItem eventKey="data/mydatasets">
                <NavText>All My Datasets</NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="add">
              <NavIcon>
                <i
                  className="fa fa-fw fa-plus"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Create Dataset</NavText>
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
                    placeholder={this.state.types[this.state.id_type].title}
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
                        <i className="fas fa-spin fa-spinner"></i> Uploading...
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
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    );
  }
}

export default withRouter(DataSidebar);
