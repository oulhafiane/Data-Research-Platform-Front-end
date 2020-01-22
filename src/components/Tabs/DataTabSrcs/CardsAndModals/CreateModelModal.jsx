import React, { useState } from 'react';
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
    FormFeedback,
} from "reactstrap"
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';

const emptyfieldColor = {
    control: styles => ({ ...styles, borderColor: 'red' })
};

const CreateModelModal = (props) => {
    const {
        modal,
        showMlResult,
        initialProps,
        toggle,
        selectedFeatures,
        selectedTarget,
        inputValue,
        handleChange,
        checkbox,
        CheckBoxOnChange,
        options,
    } = props

    const [btnPressed, setBtnOnChange] = useState(false)

    const formValidation = () => {
        if (btnPressed &&
            !selectedFeatures ||
            !selectedTarget ||
            !inputValue
        ) {
            console.log("Hi")
            return false
        }
        return true
    }
    return (
        <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Creation of model</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="name">Model Name</Label>
                        <Input
                            invalid={btnPressed && !inputValue ? true : false}
                            type="text"
                            name="name"
                            id="modelname"
                            placeholder="model name"
                            value={inputValue != null ? inputValue : ""}
                            onChange={(e) => {
                                e.preventDefault()
                                handleChange(e.target.value, 'InputValue')
                                e.target.value = ""
                            }}
                        />
                        <FormFeedback>Please fill out this field</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <div style={{ marginBottom: '-1rem' }}>
                            <Label for="exampleSelectMulti">Select Feature</Label>
                            <Select
                                styles={btnPressed && !selectedFeatures ?
                                    emptyfieldColor : ""
                                }
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={selectedFeatures}
                                onChange={(value) => handleChange(value, 'Features')}
                                options={options}
                            />
                            < Checkbox
                                checked={checkbox}
                                onChange={CheckBoxOnChange}
                                value="checkedB"
                                color="primary"
                            />
                            <Label>{!checkbox ? "Select All" : "Unselect All"}</Label>
                            {btnPressed && !selectedFeatures
                                ? <FormFeedback style={{ display: 'block' }}>Please fill out this field</FormFeedback>
                                : null}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelectMulti">Select Target</Label>
                        <Select
                            styles={btnPressed && !selectedTarget ?
                                emptyfieldColor : ""
                            }
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={selectedTarget}
                            onChange={(value) => handleChange(value, 'Target')}
                            options={options}
                        />
                        {btnPressed && !selectedTarget
                            ? <FormFeedback style={{ display: 'block' }}>Please fill out this field</FormFeedback>
                            : null}
                    </FormGroup>
                    {/* <FormGroup >
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                    </FormText>
                    </FormGroup> */}
                </Form>
            </ModalBody >
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        setBtnOnChange(true)
                        console.log('btn ==> \n targrt ==> \n Feature ==> \n, input ==> \n',
                            btnPressed,
                            selectedTarget
                            , selectedFeatures,
                            inputValue)
                        if (formValidation()) {
                            setBtnOnChange(false)
                            window.scrollTo(0, 0)
                            initialProps()
                            showMlResult()
                        }
                    }}
                >
                    Submit
            </Button>
                <Button
                    color="secondary"
                    onClick={() => {
                        window.scrollTo(0, 0)
                        toggle()
                    }}
                >
                    Cancel
            </Button>
            </ModalFooter>
        </Modal >
    )
}

CreateModelModal.propTypes = {
    toggle: PropTypes.func,
};

export default CreateModelModal