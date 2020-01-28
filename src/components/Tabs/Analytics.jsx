import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Container,
  Row,
  CardBody,
  Collapse,
  Button,
  Col,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  FormGroup,
  Label,
  UncontrolledTooltip,
} from "reactstrap";
import ShowCharts from './VisualizationTabSrcs/ShowCharts'
import MCollapse from './VisualizationTabSrcs/MCollapse'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './index.css'
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import CustomPaginationActionsTable from './VisualizationTabSrcs/Table';

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
const data = [
  ['countries', 'population'],
  ['morocco', '30000000'],
  ['algeria', '50000000'],
  ['tunsie', '30000000'],
  ['eygpt', '80000000']
];

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 450,
  },
});

class Analytics extends React.Component {
  // state = {
  //   isOpen: true,
  //   showChart: false
  // }
  // CollapseHandler = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen,
  //     // showChart: (this.state.isOpen == false) ? false : true
  //   })
  // }
  // ShowChartsHandler = () => {
  //   this.setState({
  //     showChart: true,
  //     isOpen: false
  //   })
  // }
  // OnCancelHandler = () => {
  //   this.setState({
  //     isOpen: false
  //   })
  // }
  constructor(props) {
    super(props);
    this.state = props;
  }
  render() {
    // const { classes } = this.props;
    // const { isOpen, showChart } = this.state
    return (
      <Container>
        <Row style={{ marginBottom: '1rem', }}>
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
        </Row>
        <Row style={{ marginBottom: '1rem', }}>
          <CustomPaginationActionsTable />
        </Row>
      </Container>
    )
  }
}

export default Analytics;