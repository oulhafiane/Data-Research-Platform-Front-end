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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Container,
  Row,
  Col
} from "reactstrap";
import InputToogleHidden from "components/Inputs/InputToogleHidden";
import ShowPost from "components/Shows/ShowPost";
import DropDownLabel from "components/Inputs/DropDownLabel";
import Dropzone from "components/Dropzone/Dropzone";

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
    id_domain: 0,
    id_category: 0,
    disabled: true,
    photo_user: require("assets/img/theme/user-profile.png"),
    showSolution: false,
    showAdvantage: false,
    showApplications: false
  };

  onFilesAdded = imgs => {
    this.setState({ imgs: imgs });
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

  updateProfile = () => {
    const config = {
      headers: { Authorization: "bearer " + this.state.token }
    };
    Axios.post(`${DEFAULT_URL}api/current/update`, this.state.user, config)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "Expired JWT Token"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.props.history.push("/auth/login");
        } else {
          console.log(error.response.data);
        }
      });
  };

  getCategories = () => {
    Axios.get(`${DEFAULT_URL}api/categories`)
      .then(res => {
        this.setState({ categories: res.data });
      })
      .catch(e => console.log(e.response.data));
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <>
        {/* Page content */}
        <Container fluid className="main-content-container px-4">
          <Row>
            <ShowPost state={this.state} />
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">New Problematic</h3>
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
                        <Col lg="6">
                          <InputTextLabel
                            id="title"
                            placeholder="Title"
                            type="text"
                            val={this.state.prob.title}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg="6">
                          <InputTextLabel
                            id="type"
                            placeholder="Type Document"
                            type="text"
                            val={this.state.prob.type}
                            onChange={this.onChange}
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
                            name="Category"
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
                        <Col md="12">
                          <InputTextLabel
                            id="link"
                            placeholder="Link"
                            type="text"
                            val={this.state.prob.link}
                            onChange={this.onChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Dropzone onFilesAdded={this.onFilesAdded} />
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">
                      Description
                    </h6>
                    <div className="pl-lg-4">
                      <InputTextLabel
                        id="description"
                        placeholder="Description"
                        type="textarea"
                        val={this.state.prob.description}
                        onChange={this.onChange}
                        rows="5"
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
                      id="applications"
                      placeholder="Possible Applications"
                      type="textarea"
                      val={this.state.prob.applications}
                      onChange={this.onChange}
                      onClick={this.showApplications}
                      showInput={this.state.showApplications}
                    />

                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={this.updateProfile}
                      size="sm"
                      disabled={this.state.disabled}
                      style={{ padding: "9px 34px 9px 34px", float: "right" }}
                    >
                      Submit
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

export default NewPost;
