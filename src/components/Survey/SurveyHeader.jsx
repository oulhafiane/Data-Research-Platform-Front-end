import React from "react";
import InputTextLabel from "components/Inputs/InputLabel";
// reactstrap components
import { Button, Alert } from "reactstrap";
class SurveyHeader extends React.Component {
  state = {
    title: { hover: false, showEdit: false, title: "" },
    extras: {},
    uploading: false,
    showGlobalWarning: false
  };
  onChangeTitle = e => {
    e.preventDefault();
    this.setState({ title: { ...this.state.title, title: e.target.value } });
  };
  render() {
    const { dataset, saveTitle } = this.props;
    return (
      <>
        {this.state.title.showEdit === false ? (
          <h3
            className="mb-0"
            style={{
              cursor: "pointer",
              padding: "20px",
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
                  ...this.state.title,
                  showEdit: true,
                  hover: false
                }
              })
            }
          >
            {dataset.name}
            {this.state.title.hover === true ? (
              <Button
                style={{ float: "right", height: "41px" }}
                color="default"
                onClick={() =>
                  this.setState({
                    title: {
                      ...this.state.title,
                      showEdit: true,
                      hover: false
                    }
                  })
                }
              >
                Edit
              </Button>
            ) : null}
          </h3>
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
              placeholder="Survey Title"
              type="text"
              val={dataset.name}
              onChange={this.onChangeTitle}
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
                  () =>
                    this.setState({
                      title: { ...this.state.title, showEdit: false },
                      uploading: false,
                      showGlobalWarning: false,
                      error: undefined
                    }),
                  err => this.setState({ showGlobalWarning: true, error: err })
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

export default SurveyHeader;
