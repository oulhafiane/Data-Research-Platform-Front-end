import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
// nodejs library that concatenates classes
import classnames from 'classnames'
// reactstrap components
import { Row, Container } from 'reactstrap'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import './index.css'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import TableRenderers from 'react-pivottable/TableRenderers'
import createPlotlyComponent from 'react-plotly.js/factory'
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers'
import CustomPaginationActionsTable from './VisualizationTabSrcs/Table'
import Axios from 'axios'
import { DEFAULT_URL } from '../../config'

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly)

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot)

class Analytics extends React.Component {
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
    const { data } = this.state
    return (
      <div style={{ height: '60vh', overflow: 'scroll' }}>
        <PivotTableUI
          data={data}
          onChange={s => {
            console.log(s)
            this.setState(s)
          }}
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...this.state}
        />
      </div>
    )
  }
}

export default Analytics
