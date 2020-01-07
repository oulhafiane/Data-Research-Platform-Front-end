import React from "react";
import InputTextLabel from "components/Inputs/InputLabel";
// reactstrap components
import { Button, Alert } from "reactstrap";
class PageHeader extends React.Component {
  state = {
    title: { hover: false, showEdit: false, title: "", description: "" },
    extras: {},
    uploading: false,
    showGlobalWarning: false
  };
  onChange = e => {
    e.preventDefault();
    this.setState({
      title: {
        ...this.state.title,
        [e.target.name]: e.target.value,
        [`${e.target.name}Target`]: e.target
      }
    });
  };
  render() {
    const { dataset, currentPage, saveTitle } = this.props;
    return (
      <>
        {this.state.title.showEdit === false ? (
          <div
            style={{
              padding: "13px",
              paddingTop: "10px",
              cursor: "pointer",
              backgroundColor: `${
                this.state.title.hover === true
                  ? "rgba(0, 0, 0, 0.10)"
                  : "rgba(0, 0, 0, 0)"
              }`
            }}
            onMouseOver={() =>
              this.setState({
                title: { ...this.state.title, hover: true }
              })
            }
            onMouseLeave={() =>
              this.setState({
                title: { ...this.state.title, hover: false }
              })
            }
            onClick={() =>
              this.setState({
                title: {
                  title: dataset.title,
                  description: dataset.description,
                  showEdit: true,
                  hover: false
                }
              })
            }
          >
            <h5 className="mb-0">
              {dataset.title === "" || dataset.title === undefined
                ? `Page ${currentPage}`
                : dataset.title}
              {this.state.title.hover === true ? (
                <Button
                  style={{ float: "right", height: "41px" }}
                  color="default"
                  onClick={() => {
                    this.setState({
                      title: {
                        title: dataset.title,
                        description: dataset.description,
                        showEdit: true,
                        hover: false
                      }
                    });
                  }}
                >
                  Edit
                </Button>
              ) : null}
            </h5>
            <h6 style={{ whiteSpace: "pre-line" }}>{dataset.description}</h6>
          </div>
        ) : null}

        {this.state.title.showEdit ? (
          <div className="modal-body">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() =>
                this.setState({
                  title: { ...this.state.title, showEdit: false }
                })
              }
            >
              <span aria-hidden={true}>×</span>
            </button>
            <InputTextLabel
              id="title"
              placeholder="Page Title"
              type="text"
              val={dataset.title}
              onChange={this.onChange}
              stateError={this.state.extras.title !== undefined}
              errorMessage={this.state.extras.title}
            />
            <InputTextLabel
              id="description"
              placeholder="Page Description"
              type="textarea"
              val={dataset.description}
              onChange={this.onChange}
              stateError={this.state.extras.title !== undefined}
              errorMessage={this.state.extras.title}
            />
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
                this.setState({ uploading: true });
                saveTitle(
                  this.state.title.title,
                  this.state.title.description,
                  () => {
                    this.setState({
                      uploading: false,
                      title: { title: "", description: "", showEdit: false }
                    });
                    if (this.state.titleTarget !== undefined)
                      this.state.titleTarget.value = "";
                    if (this.state.descriptionTarget !== undefined)
                      this.state.descriptionTarget.value = "";
                  },
                  err =>
                    this.setState({
                      showGlobalWarning: true,
                      error: err,
                      uploading: false
                    })
                );
              }}
            >
              {this.state.uploading ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Saving...
                </React.Fragment>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              color="link"
              type="button"
              style={{ float: "right" }}
              onClick={() =>
                this.setState({
                  title: { ...this.state.title, showEdit: false }
                })
              }
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </>
    );
  }
}

export default PageHeader;
