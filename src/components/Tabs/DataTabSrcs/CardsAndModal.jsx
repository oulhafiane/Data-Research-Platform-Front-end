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
import PropTypes from 'prop-types';

class CardsAndModal extends Component {
    render() {
        const { toggle, modal, showMlResult } = this.props
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
                                <Input type="text" name="name" id="modelname" placeholder="model name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Select Feature</Label>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleFile">File</Label>
                                <Input type="file" name="file" id="exampleFile" />
                                <FormText color="muted">
                                    This is some placeholder block-level help text for the above input.
                                    It's a bit lighter and easily wraps to a new line.
                                </FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            window.scrollTo(0, 0)
                            showMlResult()
                        }}
                        >
                            Submit
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