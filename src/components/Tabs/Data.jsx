import React, { Fragment } from "react";
// reactstrap components
import { Row, Container } from "reactstrap";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "./index.css";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyComponent from "react-plotly.js/factory";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import CustomPaginationActionsTable from "./VisualizationTabSrcs/Table";

// create Plotly React component via dependency injection
const Plot = createPlotlyComponent(window.Plotly);

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
const data = [
  ["countries", "population"],
  ["morocco", "30000000"],
  ["algeria", "50000000"],
  ["tunsie", "30000000"],
  ["eygpt", "80000000"]
];

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const styles = theme => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 450
  }
});

class Data extends React.Component {
  render() {
    return (
      <Container>
        <Row style={{ marginBottom: "1rem" }}>
          <PivotTableUI
            data={data}
            onChange={s => {
              console.log(s);
              this.setState(s);
            }}
            renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
            {...this.state}
          />
        </Row>
        <Row style={{ marginBottom: "1rem" }}>
          <CustomPaginationActionsTable />
        </Row>
      </Container>
    );
  }
}

export default Data;
