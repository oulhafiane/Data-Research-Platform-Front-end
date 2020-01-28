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
import { withRouter } from "react-router-dom";

// reactstrap components
import { Row, Col, Modal, Button } from "reactstrap";

class MenuPost extends React.Component {
  state = { token: localStorage.getItem("token") };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  editProblematic = e => {
    e.preventDefault();
    this.props.history.push(`/default/posts/${this.props.state.id}/edit`);
  };

  deleteProblematic = e => {
    e.preventDefault();
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.delete(`${DEFAULT_URL}api/problematic/${this.props.state.id}`, config)
      .then(res => {
        this.props.history.push(`/default/posts`);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <>
        <Row style={{ margin: "-80px 15px 30px" }}>
          {/* Menu */}
          <Col lg="14">
            <Button
              color="info"
              href="#pablo"
              onClick={this.editProblematic}
              style={{ float: "left" }}
            >
              <i className="fas fa-edit"></i> Edit
            </Button>
            <Button
              color="info"
              href="#pablo"
              style={{ float: "right" }}
              onClick={() => this.toggleModal("notificationModal")}
            >
              <i className="fas fa-trash-alt"></i> Delete
            </Button>
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
                    Are you sure you want to permanently delete this idea ?
                  </h4>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  className="btn-white"
                  color="default"
                  type="button"
                  onClick={this.deleteProblematic}
                >
                  Yes
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(MenuPost);
