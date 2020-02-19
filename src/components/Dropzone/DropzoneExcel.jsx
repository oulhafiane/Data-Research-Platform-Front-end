import React, { Component } from "react";
// reactstrap components
import { Alert } from "reactstrap";

class DropzoneExcel extends Component {
  state = { hightlight: false };

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  openFileDialog = () => {
    this.fileInputRef.current.click();
  };

  onDragOver = e => {
    e.preventDefault();
    this.setState({ hightlight: true });
  };

  onDragLeave = () => {
    this.setState({ hightlight: false });
  };

  onDrop = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  };

  onFilesAdded = e => {
    const files = e.target.files;
    if (this.props.onFilesAdded) {
      this.props.onFilesAdded(files[0]);
    }
  };

  render() {
    return (
      <>
        <div
          className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
          onClick={this.openFileDialog}
        >
          <section>
            <div tabIndex="0" className="text-center text-muted py-4">
              <input
                name="fileExcel"
                accept=".xlsx, .xls"
                ref={this.fileInputRef}
                onChange={this.onFilesAdded}
                className="FileInput"
                type="file"
                autoComplete="off"
                tabIndex="-1"
                style={{ display: "none" }}
              />
              <p style={{ marginBottom: "-1rem" }}>
                Drag & drop Excel file here,
                <br />
                Or click to select Excel file
              </p>
            </div>
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "15px",
                marginBottom: "15px",
                backgroundColor: "rgba(0,0,0,0.25)"
              }}
            >
              {this.props.fileExcel.file
                ? this.props.fileExcel.file.name
                : null}
            </aside>
          </section>
        </div>
        <Alert color="warning" style={{ marginTop: "20px" }}>
          <span class="alert-inner--icon">
            <i class="ni ni-bell-55"></i>
          </span>
          <strong>Important Notice!</strong> <br /> Make sure all columns are
          defined, without collapsing or grouping (the file must have a table
          with only data and the data does not have special or complicated
          characters) and you can add multiple pages by creating multiple
          spreadsheets.
        </Alert>
      </>
    );
  }
}

export default DropzoneExcel;
