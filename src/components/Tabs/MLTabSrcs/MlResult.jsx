import React, { Component } from 'react';
import {
    Container,
    Button,
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardTitle,
    CardText,
} from "reactstrap"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

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
    table: {
        minWidth: 700,
    },
});

const classname = (activeTab) => {

}
class MlResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1'
        }
    }
    _onShow = (showtype) => {
        if (showtype == 'show1')
            this.setState({ show1: true })
        else if (showtype == 'show2')
            this.setState({ show2: true })
        else if (showtype == 'show3')
            this.setState({ show3: true })
    }
    toggle = (tab) => {
        this.setState({ activeTab: tab })
    }
    __render = (classes, data, columns, rows) => {
        const { activeTab } = this.state

        console.log("data ==> ", data)
        console.log("columns ==> ", columns)
        console.log("row ==> ", rows)
        if (activeTab === '1' && data && columns && rows) {
            return (
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                {columns ? columns.map((el, index) => <StyledTableCell key={index}>{el}</StyledTableCell>) : null}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows ? rows.map((el, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">{el}</StyledTableCell>
                                        {data ? data[index].map((el, index) => {
                                            return (
                                                <StyledTableCell key={index} align="right">{el}</StyledTableCell>
                                            )
                                        }) : null}
                                    </StyledTableRow>
                                )
                            }) : null}
                        </TableBody>
                    </Table>
                </TableContainer >
            )
        }
        else
            return null
    }
    render() {
        const { classes } = this.props;
        const { data, columns, rows } = this.props
        const { activeTab } = this.state

        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab === '1' ? "active nav-link" : null}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Descriptive Table
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '2' ? "active nav-link" : null}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Summarize
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '3' ? "active nav-link" : null}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Download Model
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        {this.__render(classes, data, columns, rows)}
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

MlResult.propTypes = {

};

export default withStyles(styles, { withTheme: true })(MlResult);
