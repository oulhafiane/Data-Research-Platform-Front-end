import React, { Component } from 'react';
import {
    Container,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
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
    Row,
    Col,
    Card
} from "reactstrap"
import Select from 'react-select';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

class CardsAndModal extends Component {

    render() {
        const {
            toggle,
            modal,
            showMlResult,
            handleFeatureChange,
            handleTargetChange,
            CheckBoxOnChange,
            modelNameOnChange,
            variables,
            selectedFeature,
            selectedTarget,
            checkbox,
            modelname,
        } = this.props

        return (
            <Container>
                <Row>
                    <Col lg="6">
                        <div>
                            <Card className="card-lift--hover shadow border-0">
                                <CardImg top width="100%" height="50%" src={require("assets/img/advance_feature_img.png")} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    <Button
                                        onClick={toggle}
                                    >
                                        Create model
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div>
                            <Card className="card-lift--hover shadow border-0">
                                <CardImg top width="100%" height="50%" src={require("assets/img/advance_feature_img.png")} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    <Button
                                        onClick={() => { console.log("hello") }}
                                    >
                                        Prediction
                                </Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle} /*className={className}*/>
                    <ModalHeader toggle={toggle}>Creation of model</ModalHeader>
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
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => {
                                window.scrollTo(0, 0)
                                showMlResult()
                            }}
                        >
                            Done
                        </Button>
                        <Button color="secondary"
                            onClick={() => {
                                window.scrollTo(0, 0)
                                toggle()
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

CardsAndModal.propTypes = {

};

export default CardsAndModal;