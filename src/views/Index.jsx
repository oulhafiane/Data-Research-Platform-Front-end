import React from 'react'
import {
  Badge,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Button,
  Alert,
} from 'reactstrap'
import Axios from 'axios'
import { DEFAULT_URL } from '../config'
// nodejs library that concatenates classes
import classnames from 'classnames'
import NewsEvents from 'components/Tabs/NewsEvents'

class Index extends React.Component {
  state = {
    showSuccess: false,
    showGlobalError: false,
    msg: {},
    sending: false,
    extras: {},
  }
  onChange = e => {
    e.preventDefault()
    this.setState({ msg: { ...this.state.msg, [e.target.id]: e.target.value } })
  }
  contactUs = e => {
    e.preventDefault()
    this.setState({ sending: true, showSuccess: false, showGlobalError: false })
    Axios.post(`${DEFAULT_URL}api/public/contact-us`, this.state.msg)
      .then(res => {
        this.setState({
          sending: false,
          showSuccess: true,
          extras: {},
        })
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.extras
        ) {
          this.setState({ sending: false, extras: error.response.data.extras })
        } else {
          this.setState({ sending: false, showGlobalError: true })
        }
      })
  }
  render() {
    return (
      <>
        {/* <section className="section bg-secondary" id="events">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="12">
                <div className="pl-md-5">
                  <div>
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                      <i className="ni ni-calendar-grid-58" />
                    </div>
                    <h2 style={{ marginLeft: "15px", display: "inline" }}>
                      News & Events
                    </h2>
                  </div>
                  <NewsEvents />
                </div>
              </Col>
            </Row>
          </Container>
        </section> */}
        <section className="section bg-secondary" id="about-us">
          <Container>
            <Row className="row-grid align-items-center">
              <Col md="6">
                <div className="pl-md-5">
                  <div>
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                      <i className="ni ni-briefcase-24" />
                    </div>
                    <h2 style={{ marginLeft: '15px', display: 'inline' }}>
                      About Us
                    </h2>
                  </div>
                  <p>
                    ImpacTree (IT*) is a collaborative platform launched within
                    P-Curiosity Lab (PCL) and one of its three driven engines.
                  </p>
                  <p>
                    IT* feeds PCL’s purpose by actionable insights to create
                    inclusive, sustainable and innovative services for
                    smallholder farmers in Morocco and across Africa. <br />
                    To serve this purpose, IT* offers an interactive platform
                    for its community of researchers and experts to tackle the
                    Smallholder farmers challenges by using two main concepts:
                    “Research Fruit Picking” and “Data2Impact”.
                  </p>
                  <p>
                    Therefore, IT* resembles communities by giving them the
                    necessary tools and the opportunity to create and share
                    their knowledge to allow a wider vision, and a greater
                    impact on our targeted population.
                  </p>
                </div>
              </Col>
              <Col md="6">
                <Card className="bg-default shadow border-0">
                  <CardImg
                    alt="..."
                    src={require('assets/img/banner/banner14.jpg')}
                    top
                    style={{ height: '600px' }}
                  />
                  <blockquote className="card-blockquote">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-bg"
                      preserveAspectRatio="none"
                      viewBox="0 0 583 95"
                    >
                      <polygon
                        className="fill-default"
                        points="0,52 583,95 0,95"
                      />
                      <polygon
                        className="fill-default"
                        opacity=".2"
                        points="0,42 583,95 683,0 0,95"
                      />
                    </svg>
                    <h4 className="display-4 font-weight-bold text-white">
                      Vision
                    </h4>
                    <p className="text-italic text-white">
                      Provide research breakthroughs and actionable insights on
                      smallholder farmers' challenges in Morocco and Africa for
                      a sustainable inclusive future.
                    </p>
                  </blockquote>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section pb-0 bg-gradient-warning" id="research">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-lg-2 ml-lg-auto" md="6">
                <div className="position-relative pl-md-5">
                  <img
                    alt="..."
                    className="img-center img-fluid"
                    src={require('assets/img/ill/ill-2.svg')}
                  />
                </div>
              </Col>
              <Col className="order-lg-1" lg="6">
                <div className="d-flex px-3">
                  <div>
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-bulb-61 text-primary" />
                    </div>
                  </div>
                  <div className="pl-4">
                    <h4 className="display-3 text-white">
                      Research Fruit Picking
                    </h4>
                    {/* <p className="text-white">
                      
                    </p> */}
                  </div>
                </div>
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                          <i className="fas fa-spa" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <p>
                          Research Fruit Picking aims to foster research
                          driven-innovation to solve smallholder farmers'
                          challenges across Africa. <br />
                          Research Fruit Picking gives you exposure and allows
                          you to share, discuss and get feedback on your
                          research-based ideas.
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="shadow shadow-lg--hover mt-5">
                  <CardBody>
                    <div className="d-flex px-3">
                      <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                          <i className="ni ni-active-40" />
                        </div>
                      </div>
                      <div className="pl-4">
                        <p>
                          As an innovation lab, we are committed to support best
                          ideas along the innovation and entrepreneurship
                          journeys. <br />
                          Don’t hesitate and take part of our research fruit
                          picking community !
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section section-lg" id="data">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require('assets/img/theme/promo-1.png')}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                    <i className="ni ni-chart-bar-32" />
                  </div>
                  <h3>Data2Impact</h3>
                  <p>
                    Data2Impact is an open-data corpus that provides actionable
                    insights on smallholder farmers challenges across Africa.{' '}
                    <br />
                    Data2Impact offers the necessary tools to collect, cleanse,
                    visualize and analyze data in the following clusters: <br />
                    Education, Health, Finance, Energy, Water and Sanitation,
                    Transportation and Environment.
                  </p>
                  <ul className="list-unstyled mt-5">
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="fas fa-database" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">
                            Data collection and cleansing: Collect data by
                            creating your own tailored survey
                          </h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="fas fa-chart-pie" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Data visualization</h6>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="d-flex align-items-center">
                        <div>
                          <Badge className="badge-circle mr-3" color="success">
                            <i className="fas fa-chart-line" />
                          </Badge>
                        </div>
                        <div>
                          <h6 className="mb-0">Data Analysis</h6>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          className="section section-lg bg-gradient-default"
          id="contact-us"
        >
          <Container className="pt-lg pb-300">
            <Row className="text-center justify-content-center">
              <Col lg="10">
                <h2 className="display-3 text-white">
                  Share knowledge. Impact lives.
                </h2>
                {/* <p className="lead text-white">
                  According to the National Oceanic and Atmospheric
                  Administration, Ted, Scambos, NSIDClead scentist, puts the
                  potentially record low maximum sea ice extent tihs year down
                  to low ice.
                </p> */}
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
        <section className="section section-lg pt-lg-0 section-contact-us">
          <Container>
            <Row className="justify-content-center mt--300">
              <Col lg="8">
                <Card className="bg-gradient-secondary shadow">
                  <CardBody className="p-lg-5">
                    <h4 className="mb-1">Contact us</h4>
                    <p className="mt-0">
                      Whether you have a question, a request or a suggestion,
                      we'd love to hear from you.
                    </p>
                    <FormGroup
                      className={classnames('mt-5', {
                        focused: this.state.nameFocused,
                      })}
                    >
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-user-run" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder="Your name"
                          type="text"
                          onFocus={e => this.setState({ nameFocused: true })}
                          onBlur={e => this.setState({ nameFocused: false })}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      {this.state.extras.fullName ? (
                        <Alert color="danger" style={{ marginTop: '10px' }}>
                          <strong>Error!</strong> {this.state.extras.fullName}
                        </Alert>
                      ) : null}
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.emailFocused,
                      })}
                    >
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          id="email"
                          name="email"
                          placeholder="Email address"
                          type="email"
                          onFocus={e => this.setState({ emailFocused: true })}
                          onBlur={e => this.setState({ emailFocused: false })}
                          onChange={this.onChange}
                        />
                      </InputGroup>
                      {this.state.extras.email ? (
                        <Alert color="danger" style={{ marginTop: '10px' }}>
                          <strong>Error!</strong> {this.state.extras.email}
                        </Alert>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Input
                        className="form-control-alternative"
                        cols="80"
                        id="message"
                        name="message"
                        placeholder="Type a message..."
                        rows="4"
                        type="textarea"
                        onChange={this.onChange}
                      />
                      {this.state.extras.message ? (
                        <Alert color="danger" style={{ marginTop: '10px' }}>
                          <strong>Error!</strong> {this.state.extras.message}
                        </Alert>
                      ) : null}
                    </FormGroup>
                    {this.state.showSuccess ? (
                      <Alert color="success">
                        <strong>Success!</strong> Your message has been
                        successfully sent to our team.
                      </Alert>
                    ) : null}
                    {this.state.showGlobalError ? (
                      <Alert color="danger" style={{ marginTop: '10px' }}>
                        <strong>Error!</strong> An error occured!
                      </Alert>
                    ) : null}
                    <div>
                      <Button
                        block
                        className="btn-round"
                        color="default"
                        size="lg"
                        type="button"
                        onClick={this.contactUs}
                      >
                        {this.state.sending ? (
                          <React.Fragment>
                            <i className="fas fa-spin fa-spinner"></i>{' '}
                            Sending...
                          </React.Fragment>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section section-lg" id="partners">
          <Container>
            <Row className="justify-content-center text-center mb-lg">
              <Col lg="8">
                <h2 className="display-3">Our Partners</h2>
              </Col>
            </Row>
            <Row>
              <Col className="mb-5 mb-lg-0" lg="4" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require('assets/img/partners/ocp.jpg')}
                    style={{ width: '200px' }}
                  />
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="4" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require('assets/img/partners/um6p.jpg')}
                    style={{ width: '200px' }}
                  />
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" lg="4" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require('assets/img/partners/inra.jpg')}
                    style={{ width: '200px' }}
                  />
                </div>
              </Col>
              {/* <Col className="mb-5 mb-lg-0" lg="3" md="6">
                <div className="px-4">
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("assets/img/partners/um6ss.jpg")}
                    style={{ width: "200px" }}
                  />
                </div>
              </Col> */}
            </Row>
          </Container>
        </section>
      </>
    )
  }
}

export default Index
