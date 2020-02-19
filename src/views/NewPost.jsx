/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Axios from "axios";
import InputTextLabel from "../components/Inputs/InputLabel";
import { DEFAULT_URL } from "../config";
import { connect } from "react-redux";
import { getUser } from "actions/userAction";

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
  Alert
} from "reactstrap";
import InputToogleHidden from "components/Inputs/InputToogleHidden";
import ShowPost from "components/Shows/ShowPost";
import DropDownLabel from "components/Inputs/DropDownLabel";
import Dropzone from "components/Dropzone/Dropzone";
import CreatableSelectLabel from "components/Inputs/CreatableSelectLabel";

const createOption = label => ({
  label,
  value: label
});

class NewPost extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    imgs: {},
    prob: {},
    categories: {
      0: {
        id: 1,
        title: "Domain",
        sub_categories: { 0: { id: 1, title: "Category" } }
      }
    },
    searchers: {},
    researchersSelected: [],
    keywordsSelected: [],
    inputValue: "",
    inputValueResearchers: "",
    uploading: false,
    id_domain: 0,
    id_category: 0,
    images_available: 0,
    disabled: true,
    photo_user: require("assets/img/theme/user-profile.png"),
    showSolution: false,
    showAdvantage: false,
    showApplications: false,
    showGlobalWarning: false,
    extras: {}
  };

  handleChange = (value, actionMeta) => {
    this.setState({ keywordsSelected: value ? value : [] });
  };

  handleInputChange = inputValue => {
    this.setState({ inputValue });
  };

  handleKeyDown = event => {
    const { inputValue } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        this.setState({
          inputValue: "",
          keywordsSelected: [
            ...this.state.keywordsSelected,
            createOption(inputValue)
          ]
        });
        event.preventDefault();
      default:
        return;
    }
  };

  onChange = e =>
    this.setState({
      prob: { ...this.state.prob, [e.target.name]: e.target.value },
      disabled: false
    });

  onChangeDomain = e => {
    e.preventDefault();
    this.setState({ id_domain: e.target.id, id_category: 0 });
  };

  onChangeCategory = e => {
    e.preventDefault();
    this.setState({ id_category: e.target.id });
  };

  onChangeSearchers = e => {
    this.setState({
      researchersSelected: e ? e : [],
      disabled: false
    });
  };

  handleInputChangeResearchers = inputValueResearchers => {
    this.setState({ inputValueResearchers });
  };

  showSolution = () =>
    this.setState({
      showSolution: !this.state.showSolution
    });

  showAdvantage = () =>
    this.setState({
      showAdvantage: !this.state.showAdvantage
    });

  showApplications = () =>
    this.setState({
      showApplications: !this.state.showApplications
    });

  getCategories = () => {
    Axios.get(`${DEFAULT_URL}api/categories`)
      .then(res => {
        this.setState({ categories: res.data });
      })
      .catch(e => console.log(e.response.data));
  };

  toBase64 = imgs => {
    Object.keys(imgs).forEach(key => {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.setState({
          imgs: {
            ...this.state.imgs,
            [key]: {
              file: imgs[key].file,
              img: imgs[key].img,
              b64: fileReader.result
            }
          },
          images_available: this.state.images_available + 1
        });
      };
      fileReader.readAsDataURL(imgs[key].file);
    });
  };

  onFilesAdded = imgs => {
    this.setState({ disabled: false, imgs: {}, images_available: 0 });
    this.toBase64(imgs);
  };

  submitData = e => {
    e.preventDefault();
    this.setState({
      uploading: true,
      showGlobalWarning: false,
      extras: {}
    });
    while (Object.keys(this.state.imgs).length !== this.state.images_available);
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    let data = {
      ...this.state.prob,
      category: {
        id: this.state.categories[this.state.id_domain].sub_categories[
          this.state.id_category
        ].id
      },
      photos: Object.values(
        Object.keys(this.state.imgs).map(key => {
          return {
            file: this.state.imgs[key].b64
          };
        })
      ),
      keywords: this.state.keywordsSelected.map((val, key) => val.value),
      researchers: this.state.researchersSelected
    };
    Axios.post(`${DEFAULT_URL}api/problematic/new`, data, config)
      .then(res => {
        this.props.history.push(`/default/posts/${res.data.extras.id}`);
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.extras
        ) {
          this.setState({
            extras: error.response.data.extras,
            showGlobalWarning: true,
            uploading: false
          });
        } else {
          this.setState({ showGlobalWarning: true, uploading: false });
        }
      });
  };

  getSearchers = () => {
    Axios.get(`${DEFAULT_URL}api/profile/all`)
      .then(res => {
        this.setState({ searchers: res ? res.data : [] });
      })
      .catch(e => console.log(e.response.data));
  };

  async componentDidMount() {
    this.getCategories();
    this.getSearchers();
    await this.props.getUser();
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container fluid className="main-content-container px-4">
          <Row>
            <ShowPost
              state={this.state}
              photo_user={
                this.props.user
                  ? this.props.user._photo
                    ? this.props.user._photo.img
                    : this.props.photo_user
                  : this.props.photo_user
              }
              request={false}
              width="6"
            />
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">New Idea</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <InputTextLabel
                            id="title"
                            placeholder="Title"
                            type="text"
                            val={this.state.prob.title}
                            onChange={this.onChange}
                            stateError={this.state.extras.title !== undefined}
                            errorMessage={this.state.extras.title}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <DropDownLabel
                            id="domain"
                            name="Category"
                            placeholder={
                              this.state.categories[this.state.id_domain].title
                            }
                            type="text"
                            val={this.state.categories}
                            onChange={this.onChangeDomain}
                          />
                        </Col>
                        <Col lg="6">
                          <DropDownLabel
                            id="category"
                            name="Sub-Category"
                            placeholder={
                              this.state.categories[this.state.id_domain]
                                .sub_categories[this.state.id_category].title
                            }
                            type="text"
                            val={
                              this.state.categories[this.state.id_domain]
                                .sub_categories
                            }
                            onChange={this.onChangeCategory}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <InputTextLabel
                            id="link"
                            placeholder="Link"
                            type="text"
                            val={this.state.prob.link}
                            onChange={this.onChange}
                            stateError={this.state.extras.link !== undefined}
                            errorMessage={this.state.extras.link}
                          />
                        </Col>
                        <Col md="6">
                          <CreatableSelectLabel
                            id="keywords"
                            placeholder="Keywords"
                            selected={this.state.keywordsSelected}
                            val={this.state.inputValue}
                            onChange={this.handleChange}
                            onInputChange={this.handleInputChange}
                            onKeyDown={this.handleKeyDown}
                            menuIsOpen={false}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <CreatableSelectLabel
                            id="members"
                            placeholder="Team Members"
                            selected={this.state.researchersSelected}
                            val={this.state.inputValueResearchers}
                            onChange={this.onChangeSearchers}
                            onInputChange={this.handleInputChangeResearchers}
                            options={Object.keys(this.state.searchers).map(
                              key => ({
                                value: this.state.searchers[key].uuid,
                                label: `${this.state.searchers[key].firstName} ${this.state.searchers[key].lastName}`
                              })
                            )}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Dropzone
                            onFilesAdded={this.onFilesAdded}
                            imgs={this.state.imgs}
                          />
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">
                      Problematic
                    </h6>
                    <div className="pl-lg-4">
                      <InputTextLabel
                        id="description"
                        placeholder="Problematic"
                        type="textarea"
                        val={this.state.prob.description}
                        onChange={this.onChange}
                        rows="5"
                        stateError={this.state.extras.description !== undefined}
                        errorMessage={this.state.extras.description}
                      />
                    </div>
                    <InputToogleHidden
                      id="solution"
                      placeholder="Solution"
                      type="textarea"
                      val={this.state.prob.solution}
                      onChange={this.onChange}
                      onClick={this.showSolution}
                      showInput={this.state.showSolution}
                    />
                    <InputToogleHidden
                      id="advantage"
                      placeholder="Advantages of the solution"
                      type="textarea"
                      val={this.state.prob.advantage}
                      onChange={this.onChange}
                      onClick={this.showAdvantage}
                      showInput={this.state.showAdvantage}
                    />
                    <InputToogleHidden
                      id="possibleApplication"
                      placeholder="Possible Applications"
                      type="textarea"
                      val={this.state.prob.possibleApplication}
                      onChange={this.onChange}
                      onClick={this.showApplications}
                      showInput={this.state.showApplications}
                    />
                    {this.state.showGlobalWarning ? (
                      <Alert color="danger">
                        <strong>Error!</strong> An error occured!
                      </Alert>
                    ) : null}
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={this.submitData}
                      size="sm"
                      disabled={this.state.disabled}
                      style={{ padding: "9px 34px 9px 34px", float: "right" }}
                    >
                      {this.state.uploading ? (
                        <React.Fragment>
                          <i className="fas fa-spin fa-spinner"></i>{" "}
                          Uploading...
                        </React.Fragment>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user,
  user: state.user.user
});

export default connect(mapStateProps, { getUser })(NewPost);
