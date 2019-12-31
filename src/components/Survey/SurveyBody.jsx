import React from "react";
import InputTextLabel from "components/Inputs/InputLabel";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Button,
  Alert,
  CardBody
} from "reactstrap";
class SurveyBody extends React.Component {
  state = {
    title: { hover: false, showEdit: false, title: "" }
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
                <strong>Error!</strong> An error occured!
              </Alert>
            ) : null}
            <Button
              color="primary"
              type="button"
              style={{ float: "right" }}
              onClick={e => {
                e.preventDefault();
                saveTitle(this.state.title.title);
                this.setState({
                  title: { ...this.state.title, showEdit: false }
                });
              }}
            >
              {this.state.uploading ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Uploading...
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

export default SurveyBody;
