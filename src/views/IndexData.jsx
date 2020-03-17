import React from 'react'
import {
  Button,
  Card,
  CardImg,
  CardBody,
  Container,
  Row,
  Col,
  Badge,
} from 'reactstrap'
import Axios from 'axios'
import { DEFAULT_URL } from '../config'
import ModalCreateDataset from 'components/Modals/ModalCreateDataset'

class IndexData extends React.Component {
  state = {
    defaultModal: false,
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    })
  }
  render() {
    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }
    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    }
    return (
      <>
        {/* Page content */}
        <Container fluid style={{ marginLeft: '50px' }}>
          <Row className="row-grid">
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardImg
                  alt="..."
                  src={require('assets/img/banner/newsurvey.jpg')}
                  top
                  style={{ height: '30vh' }}
                />
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                    <i className="ni ni-check-bold" />
                  </div>
                  <h6 className="text-primary text-uppercase">
                    Create Dataset
                  </h6>
                  <p className="description mt-3" style={{ height: '12vh' }}>
                    Create survey or import data, clean the data, get the data
                    summary, analyze the data, and, create machine learning
                    model.
                  </p>
                  <div>
                    <Badge color="primary" pill className="mr-1">
                      Dataset
                    </Badge>
                    <Badge color="primary" pill className="mr-1">
                      Survey
                    </Badge>
                    <Badge color="primary" pill className="mr-1">
                      Analysis
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="primary"
                    onClick={() => this.toggleModal('defaultModal')}
                  >
                    Create Dataset
                  </Button>
                  <ModalCreateDataset
                    defaultModal={this.state.defaultModal}
                    toggleModal={this.toggleModal}
                    history={this.props.history}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardImg
                  alt="..."
                  src={require('assets/img/banner/mysurveys.jpg')}
                  top
                  style={{ height: '30vh' }}
                />
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                    <i className="ni ni-istanbul" />
                  </div>
                  <h6 className="text-success text-uppercase">My Datasets</h6>
                  <p className="description mt-3" style={{ height: '12vh' }}>
                    Consult and edit all your datasets.
                  </p>
                  <div>
                    <Badge color="success" pill className="mr-1">
                      Dataset
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      Survey
                    </Badge>
                    <Badge color="success" pill className="mr-1">
                      Analysis
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="success"
                    href="/data/mydatasets"
                  >
                    My Datasets
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-lift--hover shadow border-0">
                <CardImg
                  alt="..."
                  src={require('assets/img/banner/publicdatasets.jpg')}
                  top
                  style={{ height: '30vh' }}
                />
                <CardBody className="py-5">
                  <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                    <i className="ni ni-planet" />
                  </div>
                  <h6 className="text-warning text-uppercase">
                    Public Datasets
                  </h6>
                  <p className="description mt-3" style={{ height: '12vh' }}>
                    Consult datasets shared by members of our community
                  </p>
                  <div>
                    <Badge color="warning" pill className="mr-1">
                      Dataset
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      Survey
                    </Badge>
                    <Badge color="warning" pill className="mr-1">
                      Analysis
                    </Badge>
                  </div>
                  <Button
                    className="mt-4"
                    color="warning"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Public Datasets
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default IndexData
