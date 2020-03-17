import React, { Fragment } from 'react'
// reactstrap components
import { CSVLink } from "react-csv";
import { Button, Row, Container } from 'reactstrap';
import ReactDOM from 'react-dom'

/*jslint browser: true, es6: true*/
class CanvasDatagrid extends React.Component {
  constructor(props) {
    super(props)
  }
  updateAttributes(nextProps) {
    Object.keys(this.props).forEach(key => {
      if (!nextProps || this.props[key] !== nextProps[key]) {
        if (this.grid.attributes[key] !== undefined) {
          this.grid.attributes[key] = nextProps
            ? nextProps[key]
            : this.props[key]
        } else {
          this.grid[key] = nextProps ? nextProps[key] : this.props[key]
        }
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    this.updateAttributes(nextProps)
  }
  shouldComponentUpdate() {
    return false
  }
  componentWillUnmount() {
    this.grid.dispose()
  }
  componentDidMount() {
    var args = {}
    this.grid = ReactDOM.findDOMNode(this)
    this.updateAttributes()
  }
  render() {
    return React.createElement('canvas-datagrid', {})
  }
}

class Data extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <CSVLink data={this.props.state.data}>
            <Button
              color="success"
              style={{ float: 'left', marginBottom: 15 }}
            >
              Export
                </Button>
          </CSVLink>
        </Row>
        <Row style={{ marginBottom: '1rem' }}>
          <div className="scrollbar scrollbar-custom">
            {this.props.showData === true ? (
              <CanvasDatagrid data={this.props.state.data} />
            ) : null}
          </div>
        </Row>
      </Container>
    )
  }
}

export default Data
