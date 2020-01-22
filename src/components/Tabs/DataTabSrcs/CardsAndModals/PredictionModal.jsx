import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
} from "reactstrap"
import Select from 'react-select';

const PredictionModal = (props) => {
    const {
        modal,
        showMlResult,
        toggle,
        selectedFeatures,
        handleChangeFeatures,
        selectedTarget,
        handleChangeTarget,
        options
    } = props

    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Try a Prediction</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select a Model</Label>
                        <Select
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={selectedTarget}
                            onChange={handleChangeTarget}
                            options={options}
                        />
                    </FormGroup>
                    <FormGroup>
                        <div style={{ marginBottom: '-1rem' }}>
                            <Label for="exampleSelectMulti">Select Feature</Label>
                            <Select
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={selectedFeatures}
                                onChange={handleChangeFeatures}
                                options={options}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup >
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
                </Form>
            </ModalBody >
            <ModalFooter>
                <Button color="primary" onClick={() => {
                    window.scrollTo(0, 0)
                    // showMlResult()
                }}
                >
                    Submit
                </Button>
                <Button color="secondary"
                    onClick={() => {
                        // window.scrollTo(0, 0)
                        toggle()
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal >
    )
}

PredictionModal.propTypes = {
    toggle: PropTypes.func,
};

export default PredictionModal