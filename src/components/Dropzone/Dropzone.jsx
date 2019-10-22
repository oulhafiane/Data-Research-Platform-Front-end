import React, { Component } from "react";

class Dropzone extends Component {
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

  fileListToArray = list => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(URL.createObjectURL(list.item(i)));
    }
    return array;
  };

  onFilesAdded = e => {
    const files = e.target.files;
    if (this.props.onFilesAdded) {
      const imgs = this.fileListToArray(files);
      this.props.onFilesAdded(imgs);
    }
  };

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <span>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;
