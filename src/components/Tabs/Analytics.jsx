import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Row,
  Container
} from "reactstrap";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './index.css'
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import CustomPaginationActionsTable from './VisualizationTabSrcs/Table';
import Axios from 'axios'
import { DEFAULT_URL } from '../../config'

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
// const data = [
//   ['countries', 'population'],
//   ['morocco', '30000000'],
//   ['algeria', '50000000'],
//   ['tunsie', '30000000'],
//   ['eygpt', '80000000']
// ];

// const StyledTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.white,
//     color: theme.palette.common.black,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles(theme => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.background.default,
//     },
//   },
// }))(TableRow);

// const styles = theme => ({
//   root: {
//     width: '100%',
//   },
//   container: {
//     maxHeight: 450,
//   },
// });

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
        console.log("data ===> ", res.data.data)
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
      <Container style={{ height: 500, overflow: 'scroll' }
      }>
        <PivotTableUI
          data={data}
          onChange={s => {
            console.log(s)
            this.setState(s)
          }
          }
          renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
          {...this.state}
        />
      </Container >
    )
  }
}

export default Analytics;
