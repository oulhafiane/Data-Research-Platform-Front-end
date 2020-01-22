import React from 'react';
import PropTypes from 'prop-types';
import {
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Row,
    Col,
    Card
} from "reactstrap"
const Cards = (props) => {
    const { toggle } = props
    return (
        <Row>
            <Col lg="6">
                <div>
                    <Card className="card-lift--hover shadow border-0">
                        <CardImg top style={{ height: '310px' }} src={require("assets/img/advance_feature_img.png")} alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button
                                onClick={() => toggle(1)}
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
                        <CardImg top style={{ height: '310px' }} src={require("assets/img/advance_feature_img.png")} alt="Card image cap" />
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button
                                onClick={() => toggle(2)}
                            >
                                Prediction
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </Col>
        </Row>
    )
}

Cards.propTypes = {
    toggle: PropTypes.func,
};

export default Cards