import React, { Component } from 'react';
import {
    Container,
} from "reactstrap"
import PropTypes from 'prop-types';
import Cards from './Cards'
import CreateModelModal from './CreateModelModal'
import PredictionModal from './PredictionModal'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

class CardsAndModals extends Component {
    state = {
        inputValue: null,
        selectedFeatures: null,
        selectedTarget: null,
        allOption: null,
        checkbox: false
    };
    initialProps = () => {
        this.setState({
            inputValue: null,
            selectedFeatures: null,
            selectedTarget: null,
            allOption: null,
            checkbox: false
        })
    }
    handleChange = (value, type) => {
        if (Array.isArray(value) &&
            (value != null) &&
            (value.length == null
                || value.length == 0)) {
            value = null
        }
        console.log('value ==> ', value)
        console.log('type ==> ', type)
        if (type === 'Features')
            this.setState({ selectedFeatures: value });
        else if (type === 'Target')
            this.setState({ selectedTarget: value })
        else if (type === 'InputValue')
            this.setState({ inputValue: value });
    }
    CheckBoxOnChange = () => {
        const { checkbox } = this.state

        if (!checkbox)
            this.setState({ checkbox: !this.state.checkbox, selectedFeatures: options })
        else
            this.setState({ checkbox: !this.state.checkbox, selectedFeatures: null })
    }
    render() {
        const { toggle, modal, showMlResult, modaltype } = this.props
        const { checkbox, selectedFeatures, selectedTarget, inputValue } = this.state
        return (
            <Container>
                <Cards toggle={toggle} />
                {
                    modaltype === 1 ?
                        <CreateModelModal
                            modal={modal}
                            showMlResult={showMlResult}
                            toggle={toggle}
                            selectedFeatures={selectedFeatures}
                            selectedTarget={selectedTarget}
                            inputValue={inputValue}
                            handleChange={this.handleChange}
                            checkbox={checkbox}
                            CheckBoxOnChange={this.CheckBoxOnChange}
                            //
                            initialProps={this.initialProps}
                            //tmp
                            options={options}
                        /> :
                        modaltype === 2 ?
                            <PredictionModal
                                modal={modal}
                                showMlResult={showMlResult}
                                toggle={toggle}
                                selectedFeatures={selectedFeatures}
                                handleChangeFeatures={this.handleChangeFeatures}
                                selectedTarget={selectedTarget}
                                handleChangeTarget={this.handleChangeTarget}
                                checkbox={checkbox}
                                CheckBoxOnChange={this.CheckBoxOnChange}
                                //tmp
                                options={options}
                            /> :
                            null
                }
            </Container >
        );
    }
}

CardsAndModals.propTypes = {
    toggle: PropTypes.func,
    showMlResult: PropTypes.func,
    modal: PropTypes.bool
};

export default CardsAndModals;