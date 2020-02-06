/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react

export default ;

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import Axios from 'axios'
import InputTextLabel from '../components/Inputs/InputLabel'
import { DEFAULT_URL } from '../config'
import { connect } from 'react-redux'
import { getUser } from 'actions/userAction'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap'
import ShowProfile from 'components/Shows/ShowProfile'
import SelectLabel from 'components/Inputs/SelectLabel'

class Profile extends React.Component {
  state = {
    token: localStorage.getItem('token'),
    user: {},
    categories: {
      0: {
        id: 1,
        title: 'Domain',
        sub_categories: { 0: { id: 1, title: 'Category' } },
      },
    },
    selected: [],
    disabled: true,
    file: null,
    showGlobalWarning: false,
    showSuccess: false,
    uploading: false,
  }

  onChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
      disabled: false,
    })
  }

  onChangeDomains = e => {
    this.setState({
      selected: e,
      disabled: false,
    })
  }

  updateProfile = e => {
    e.preventDefault()
    let domains = this.state.selected.map(domain => ({
      id: domain.value,
    }))
    this.setState({
      showSuccess: false,
      showGlobalWarning: false,
      uploading: true,
    })
    const config = {
      headers: { Authorization: 'bearer ' + this.state.token },
    }
    Axios.post(
      `${DEFAULT_URL}api/current/update`,
      { ...this.state.user, domains: domains },
      config,
    )
      .then(res => {
        this.setState({ showSuccess: true, uploading: false })
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Expired JWT Token'
        ) {
          localStorage.removeItem('token')
          this.props.history.push('/auth/login')
        } else {
          this.setState({
            message: error.response.data.message,
            showGlobalWarning: true,
          })
        }
      })
  }

  getCategories = () => {
    Axios.get(`${DEFAULT_URL}api/categories`)
      .then(res => {
        this.setState({ categories: res.data })
      })
      .catch(e => console.log(e.response.data))
  }

  async componentDidMount() {
    this.getCategories()
    await this.props.getUser()
    const domains = this.props.user.domains.map(domain => ({
      value: domain.id,
      label: domain.title,
    }))
    this.setState({ user: this.props.user, selected: domains })
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container fluid className="main-content-container px-4">
          <Row>
            <ShowProfile
              state={this.state}
              photo_user={this.props.photo_user}
            />
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <InputTextLabel
                            id="firstName"
                            placeholder="First name"
                            type="text"
                            val={this.state.user.firstName}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="6">
                          <InputTextLabel
                            id="lastName"
                            placeholder="Last name"
                            type="text"
                            val={this.state.user.lastName}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <InputTextLabel
                            id="jobTitle"
                            placeholder="Job Title"
                            type="text"
                            val={this.state.user.jobTitle}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="6">
                          <SelectLabel
                            id="domains"
                            placeholder="Domains Of Expertise"
                            type="text"
                            selected={this.state.selected}
                            val={Object.keys(this.state.categories).map(
                              key => ({
                                value: this.state.categories[key].id,
                                label: this.state.categories[key].title,
                              }),
                            )}
                            onChange={this.onChangeDomains}
                          />
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Organization information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <InputTextLabel
                            id="organization"
                            placeholder="Organization"
                            type="text"
                            val={this.state.user.organization}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col md="6">
                          <InputTextLabel
                            id="organizationAddress"
                            placeholder="Organization Address"
                            type="text"
                            val={this.state.user.organizationAddress}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <InputTextLabel
                            id="organizationCity"
                            placeholder="Organization City"
                            type="text"
                            val={this.state.user.organizationCity}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="6">
                          <InputTextLabel
                            id="organizationCountry"
                            placeholder="Organization Country"
                            type="text"
                            val={this.state.user.organizationCountry}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <InputTextLabel
                        id="bio"
                        placeholder="About me"
                        type="textarea"
                        val={this.state.user.bio}
                        onChange={this.onChange}
                        rows="10"
                      />
                    </div>
                    {this.state.showSuccess ? (
                      <Alert color="success">
                        <strong>Success!</strong> You profile has been updated.
                      </Alert>
                    ) : null}
                    {this.state.showGlobalWarning ? (
                      <Alert color="danger">
                        <strong>Error!</strong> {this.state.message}
                      </Alert>
                    ) : null}
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={this.updateProfile}
                      size="sm"
                      disabled={this.state.disabled}
                      style={{ padding: '9px 34px 9px 34px', float: 'right' }}
                    >
                      {this.state.uploading ? (
                        <React.Fragment>
                          <i className="fas fa-spin fa-spinner"></i>{' '}
                          Uploading...
                        </React.Fragment>
                      ) : (
                        'Update profile'
                      )}
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user,
  user: state.user.user,
})

export default connect(mapStateProps, { getUser })(Profile)
