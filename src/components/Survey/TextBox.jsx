import React from "react";
import InputTextLabel from "components/Inputs/InputLabel";
// reactstrap components
import { Input, Button, Alert, Modal, Row, Col } from "reactstrap";
class TextBox extends React.Component {
  state = {
    extras: {},
    hoverIndex: -1,
    question: {
      question: this.props.val.question,
      name: this.props.val.name,
      type: this.props.val.type
    },
    editing: false,
    deleting: false
  };
  onChange = e => {
    e.preventDefault();
    this.setState({
      question: { ...this.state.question, [e.target.name]: e.target.value }
    });
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    const {
      val,
      index,
      editQuestion,
      removeQuestion,
      showEditIndex,
      changeShowEditIndex
    } = this.props;
    return (
      <div>
        {showEditIndex !== index ? (
          <div
            style={{
              padding: "20px",
              cursor: "pointer",
              marginTop: "30px",
              marginBottom: "20px",
              backgroundColor: `${
                this.state.hoverIndex === index
                  ? "rgba(0, 0, 0, 0.10)"
                  : "rgba(0, 0, 0, 0)"
              }`
            }}
            onMouseOver={() =>
              this.setState({
                hoverIndex: index
              })
            }
            onMouseLeave={() =>
              this.setState({
                hoverIndex: -1
              })
            }
            onClick={e => {
              if (e.target.value === "delete") return;
              changeShowEditIndex(index);
            }}
          >
            <h3 className="mb-0">
              {index + 1}) {val.question}
              {this.state.hoverIndex === index ? (
                <>
                  <Button
                    style={{
                      marginBottom: "5px",
                      float: "right",
                      height: "41px"
                    }}
                    color="danger"
                    value="delete"
                    onClick={() => this.toggleModal("notificationModal")}
                  >
                    {this.state.deleting ? (
                      <React.Fragment>
                        <i className="fas fa-spin fa-spinner"></i> Deleting...
                      </React.Fragment>
                    ) : (
                      "Delete"
                    )}
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
                          Are you sure you want to permanently delete this ?
                        </h4>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button
                        className="btn-white"
                        color="default"
                        type="button"
                        onClick={() => {
                          this.setState({ deleting: true });
                          removeQuestion(
                            index,
                            () => this.setState({ deleting: false }),
                            err =>
                              this.setState({
                                showGlobalWarning: true,
                                error: err,
                                deleting: false
                              })
                          );
                          this.toggleModal("notificationModal");
                        }}
                      >
                        Delete
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
                  <Button
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                      float: "right",
                      height: "41px"
                    }}
                    color="default"
                    onClick={() => {
                      changeShowEditIndex(index);
                      this.setState({
                        hoverIndex: -1
                      });
                    }}
                  >
                    Edit
                  </Button>
                </>
              ) : null}
            </h3>
            {val.type === 0 ? (
              <Input
                /*placeholder="Blabla"*/

                style={{ cursor: "pointer" }}
                name={val.name}
                disabled
              />
            ) : null}
          </div>
        ) : null}

        {showEditIndex === index ? (
          <div className="modal-body">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => changeShowEditIndex(-1)}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <Row>
              <Col lg="8">
                <InputTextLabel
                  id="question"
                  placeholder="Question"
                  type="text"
                  val={this.state.question.question}
                  onChange={this.onChange}
                />
              </Col>
              <Col lg="4">
                <InputTextLabel
                  id="name"
                  placeholder="Variable Name"
                  type="text"
                  val={this.state.question.name}
                  onChange={this.onChange}
                />
              </Col>
            </Row>
            {/* To check what to do with this globalWarning */}
            {this.state.showGlobalWarning ? (
              <Alert color="danger">
                <strong>Error!</strong>{" "}
                {this.state.error ? this.state.error : "An error occured!"}
              </Alert>
            ) : null}
            <Button
              color="primary"
              type="button"
              style={{ float: "right" }}
              onClick={e => {
                e.preventDefault();
                if (
                  !this.state.question.question ||
                  !this.state.question.name
                ) {
                  this.setState({
                    showGlobalWarning: true,
                    error: "The variable name or question is empty!"
                  });
                  return;
                }
                this.setState({ editing: true });
                editQuestion(
                  this.state.question,
                  index,
                  () => {
                    changeShowEditIndex(-1);
                    this.setState({
                      editing: false,
                      showGlobalWarning: false,
                      error: undefined
                    });
                  },
                  err => {
                    this.setState({
                      showGlobalWarning: true,
                      error: err,
                      editing: false
                    });
                  }
                );
              }}
            >
              {/* When data will be saved in the server you must add this option Uploading */}
              {this.state.editing ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Editing...
                </React.Fragment>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              color="link"
              type="button"
              style={{ float: "right" }}
              onClick={() => changeShowEditIndex(-1)}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TextBox;