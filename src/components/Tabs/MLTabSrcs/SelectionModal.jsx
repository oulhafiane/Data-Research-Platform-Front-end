import React, { Component } from 'react';
import {
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from "reactstrap"
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';

class SelectionModal extends Component {

    render() {
        const {
            boolean,
            toggle,
            createModel,
            handleFeatureChange,
            handleTargetChange,
            CheckBoxOnChange,
            modelNameOnChange,
            variables,
            selectedFeature,
            selectedTarget,
            checkbox,
            modelname,
            showError,
        } = this.props
        console.log("toggle ==> ", boolean)
        return (
            <Container>
                <Modal isOpen={boolean}/*className={className}*/>
                    <ModalHeader>Creation of model</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Model Name</Label>
                                <Input type="text" name="name" id="modelname" placeholder="model name" onChange={(e) => modelNameOnChange(e.target.value)} value={modelname} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Select Feature</Label>
                                <Select
                                    // styles={btnPressed && !selectedSeries ?
                                    //     emptyfieldColor : ""
                                    // }
                                    isMulti
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={selectedFeature}
                                    onChange={handleFeatureChange}
                                    options={variables}
                                />
                                < Checkbox
                                    checked={checkbox}
                                    onChange={() => CheckBoxOnChange(variables)}
                                    value="checkedB"
                                    color="primary"
                                />
                                <Label>{!checkbox ? "Select All" : "Unselect All"}</Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Select Target</Label>
                                <Select
                                    value={selectedTarget}
                                    onChange={(value) => {
                                        handleTargetChange(value)
                                    }}
                                    options={variables}
                                />
                            </FormGroup>
                            {showError ? (
                                <Alert color="danger">
                                    <strong>Please fill out all fields</strong>
                                </Alert>
                            ) : null}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => {
                                createModel()
                                    .then(res => {
                                        window.scrollTo(0, 0)
                                        toggle(1)
                                    })
                                    .catch(err => {
                                        window.scrollTo(0, 0)
                                    })
                            }}
                        >
                            Done
                        </Button>
                        <Button color="secondary"
                            onClick={() => {
                                window.scrollTo(0, 0)
                                toggle(1)
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Container >
        );
    }
}

SelectionModal.propTypes = {

};

export default SelectionModal;