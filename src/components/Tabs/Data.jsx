import React, { Fragment } from "react";
// reactstrap components
import { Row, Container } from "reactstrap";
import ReactDOM from "react-dom";

/*jslint browser: true, es6: true*/
class CanvasDatagrid extends React.Component {
  constructor(props) {
    super(props);
  }
  updateAttributes(nextProps) {
    Object.keys(this.props).forEach(key => {
      if (!nextProps || this.props[key] !== nextProps[key]) {
        if (this.grid.attributes[key] !== undefined) {
          this.grid.attributes[key] = nextProps
            ? nextProps[key]
            : this.props[key];
        } else {
          this.grid[key] = nextProps ? nextProps[key] : this.props[key];
        }
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    this.updateAttributes(nextProps);
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    this.grid.dispose();
  }
  componentDidMount() {
    var args = {};
    this.grid = ReactDOM.findDOMNode(this);
    this.props.sendGridToParent(this.grid);
    this.updateAttributes();
  }
  render() {
    return React.createElement("canvas-datagrid", {});
  }
}

class Data extends React.Component {
  render() {
    return (
      <Row style={{ marginBottom: "1rem" }}>
        <div className="scrollbar scrollbar-custom">
          <CanvasDatagrid
            data={this.props.state.data}
            sendGridToParent={this.props.sendGridToParent}
          />
        </div>
      </Row>
    );
  }
}

export default Data;
