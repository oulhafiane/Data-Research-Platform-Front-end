import React, { Fragment } from 'react'
// reactstrap components
import { Row, Container } from 'reactstrap'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import { DEFAULT_URL } from '../../config'

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
  state = {
    token: localStorage.getItem('token'),
    data: [],
    length: 156800,
  }
  dataAdapter = offset => {
    const config = {
      headers: { Authorization: 'bearer ' + this.state.token },
    }
    Axios.get(
      `${DEFAULT_URL}api/current/dataset/${this.props.state.uuid}/data?offset=${offset}`,
      config,
    )
      .then(res => {
        this.setState({
          data: res.data ? (res.data.data ? res.data.data : []) : [],
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }
  componentDidMount() {
    this.dataAdapter(0, 100)
  }
  render() {
    return (
      <Row style={{ marginBottom: '1rem' }}>
        {React.createElement(
          'div',
          { className: 'scrollbar scrollbar-custom' },
          React.createElement(CanvasDatagrid, {
            data: this.state.data,
          }),
        )}
      </Row>
    )
  }
}

export default Data
