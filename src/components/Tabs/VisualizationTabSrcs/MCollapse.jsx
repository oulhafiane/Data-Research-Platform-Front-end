import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import {
    Card,
    CardFooter,
    FormFeedback,
    Row,
    CardBody,
    Collapse,
    Button,
    Col,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import Checkbox from '@material-ui/core/Checkbox';
import './index.css'

const PieChart = "Pie chart"
const LineChart = "Line chart"
const BarChart = "Bar chart"

const options = [
    {
        value: PieChart,
        label:
            <div>
                <PieChartIcon />
                <span style={{ marginLeft: '1rem'/*, fontSize: '0.9em'*/ }}>{PieChart}</span>
            </div >
    },
    {
        value: LineChart,
        label:
            <div>
                <BarChartIcon />
                <span style={{ marginLeft: '1rem'/*, fontSize: '0.9em'*/ }}>{BarChart}</span>
            </div >
    },
    {
        value: BarChart,
        label:
            <div>
                <ShowChartIcon />
                <span style={{ marginLeft: '1rem'/*, fontSize: '0.9em'*/ }}>{LineChart}</span>
            </div >
    },
];

const Series = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const Lables = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const emptyfieldColor = {
    control: styles => ({ ...styles, borderColor: 'red' })
};

class MCollapse extends Component {
    state = {
        selectedSeries: null,
        selectedLables: null,
        selectedCharts: null,
        title: null,
        subtitle: null,
        btnPressed: false,
        checkbox: false
    };
    handleChange = (value, type) => {
        if (Array.isArray(value) &&
            (value != null) &&
            (value.length == null
                || value.length == 0)) {
            value = null
        }
        if (type == 'title') {
            this.setState({ title: value })
        }
        else if (type == 'subtitle') {
            this.setState({ subtitle: value })
        }
        else if (type === 'charts') {
            this.setState({ selectedCharts: value })
        }
        else if (type == 'lables') {
            this.setState({ selectedLables: value })
        }
        else if (type == 'series') {
            this.setState({ selectedSeries: value })
        }
    };
    CheckFields = () => {
        const {
            selectedLables,
            selectedCharts,
            selectedSeries,
            title,
            subtitle,
            btnPressed
        } = this.state

        if (btnPressed &&
            !selectedCharts ||
            !selectedCharts ||
            !selectedSeries ||
            !title ||
            !subtitle)
            return false
        return true
    }

    CheckBoxOnChange = () => {
        const { checkbox } = this.state

        if (!checkbox)
            this.setState({ checkbox: !this.state.checkbox, selectedCharts: options })
        else
            this.setState({ checkbox: !this.state.checkbox, selectedCharts: null })
    }
    render() {
        const {
            CollapseHandler,
            ShowChartsHandler,
            isOpen,
            OnCancelHandler
        } = this.props

        const {
            btnPressed,
            selectedLables,
            selectedCharts,
            selectedSeries,
            title,
            subtitle,
            checkbox
        } = this.state

        return (
            <div>
                <Button color="primary"
                    onClick={() => {
                        this.setState({
                            selectedSeries: null,
                            selectedLables: null,
                            selectedCharts: null,
                            title: null,
                            subtitle: null,
                            btnPressed: false
                        })
                        CollapseHandler()
                    }}
                    style={{ marginBottom: '1rem' }}>
                    Customize Your Chart
                    </Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for="Text">Chart Title</Label>
                                        <Input
                                            invalid={btnPressed && !title ? true : false}
                                            className={'inputhover input'}
                                            id="ChartTitle"
                                            placeholder="Enter chart title"
                                            type="text"
                                            value={title ? title : ""}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                this.handleChange(e.target.value, 'title')
                                                e.target.value = ""
                                            }}
                                        />
                                        <FormFeedback>Please fill out this field</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for="Text">Subtitle</Label>
                                        <Input
                                            invalid={btnPressed && !subtitle ? true : false}
                                            className={'inputhover input'}
                                            id="subtitle"
                                            placeholder="Enter chart subtitle"
                                            type="text"
                                            value={subtitle ? subtitle : ""}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                this.handleChange(e.target.value, 'subtitle')
                                                e.target.value = ""
                                            }}
                                        />
                                        <FormFeedback>Please fill out this field</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for="exampleSelectMulti">Select Lables</Label>
                                        <Select
                                            styles={btnPressed && !selectedLables ?
                                                emptyfieldColor : ""
                                            }
                                            isMulti
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            value={selectedLables}
                                            onChange={(value) => {
                                                this.handleChange(value, 'lables')
                                            }}
                                            options={Lables}
                                        />
                                    </FormGroup>
                                    {btnPressed && !selectedLables
                                        ? <FormFeedback style={{ display: 'block' }}>Please fill out this field</FormFeedback>
                                        : null}
                                </Col>
                                <Col lg="6">
                                    <FormGroup>
                                        <Label for="exampleSelectMulti">Select Series</Label>
                                        <Select
                                            styles={btnPressed && !selectedSeries ?
                                                emptyfieldColor : ""
                                            }
                                            isMulti
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            value={selectedSeries}
                                            onChange={(value) => {
                                                this.handleChange(value, 'series')
                                            }}
                                            options={Series}
                                        />
                                        {btnPressed && !selectedSeries
                                            ? <FormFeedback style={{ display: 'block' }}>Please fill out this field</FormFeedback>
                                            : null}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6">
                                    <FormGroup>
                                        <div style={{ marginBottom: '-1rem' }}>
                                            <Label for="exampleSelectMulti">Choose Chart</Label>
                                            <Select
                                                styles={btnPressed && !selectedCharts ?
                                                    emptyfieldColor : ""
                                                }
                                                isMulti
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                value={selectedCharts}
                                                onChange={(value) => {
                                                    this.setState({ btnPressed: false })
                                                    this.handleChange(value, 'charts')
                                                }}
                                                options={options}
                                            />
                                            < Checkbox
                                                checked={checkbox}
                                                onChange={this.CheckBoxOnChange}
                                                value="checkedB"
                                                color="primary"
                                            />
                                            <Label>{!checkbox ? "Select All" : "Unselect All"}</Label>
                                            {btnPressed && !selectedCharts
                                                ? <FormFeedback style={{ display: 'block' }}>Please fill out this field</FormFeedback>
                                                : null}
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className="btn-wrapper" style={{ marginTop: "20px" }}>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.setState({ btnPressed: false })
                                        OnCancelHandler()
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.setState({ btnPressed: true })
                                        if (this.CheckFields()) {
                                            ShowChartsHandler()
                                        }
                                    }}
                                >
                                    Done
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Collapse>
            </div >
        );
    }
}

MCollapse.propTypes = {
    CollapseHandler: PropTypes.func.isRequired,
    ShowChartsHandler: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    OnCancelHandler: PropTypes.func.isRequired,
};

export default MCollapse;