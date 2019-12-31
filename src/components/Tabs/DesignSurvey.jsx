/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
import InputTextLabel from "components/Inputs/InputLabel";
import DropDownLabel from "components/Inputs/DropDownLabel";
import SurveyHeader from "components/Survey/SurveyHeader";
import SurveyBody from "components/Survey/SurveyBody";
import { TYPES_DATA } from "config";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Button,
  Alert,
  CardBody
} from "reactstrap";

class DesignSurvey extends React.Component {
  state = {
    currentPage: 1,
    nbrPages: 1,
    extras: {},
    newQuestion: { variable: "", question: "" },
    newQuestionTypeId: 0
  };
  onChange = e =>
    this.setState({
      newQuestion: {
        ...this.state.newQuestion,
        [e.target.name]: e.target.value
      }
    });
  onChangeTitle = e => {
    e.preventDefault();
    this.setState({ title: { ...this.state.title, title: e.target.value } });
  };
  render() {
    const { state, saveTitle, addQuestion, saveData } = this.props;
    return (
      <>
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <SurveyHeader dataset={state.dataset} saveTitle={saveTitle} />
              </CardHeader>
              <CardBody>
                {/* <SurveyBody dataset={state.dataset} /> */}
              </CardBody>
              <CardFooter className="py-4">
                <Row>
                  <Col lg="6">
                    <InputTextLabel
                      id="question"
                      placeholder="New Question"
                      type="text"
                      val={this.state.newQuestion.question}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col lg="3">
                    <InputTextLabel
                      id="variable"
                      placeholder="Variable Name"
                      type="text"
                      val={this.state.newQuestion.name}
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col lg="3">
                    <DropDownLabel
                      id="type"
                      name="Type"
                      placeholder={
                        TYPES_DATA[this.state.newQuestionTypeId].title
                      }
                      type="text"
                      val={TYPES_DATA}
                      onChange={this.onChangeType}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-center">
                      {this.state.currentPage > 1 ? (
                        <Link to="/default/events" className="btn btn-event">
                          PREVIOUS
                        </Link>
                      ) : null}
                      {this.state.currentPage === this.state.nbrPages ? (
                        <Link
                          to="#add"
                          onClick={e => {
                            e.preventDefault();
                            addQuestion(
                              {
                                question: this.state.newQuestion.question,
                                variable: this.state.newQuestion.variable,
                                type: this.state.newQuestionTypeId
                              },
                              this.state.currentPage
                            );
                          }}
                          className="btn btn-event"
                        >
                          + ADD
                        </Link>
                      ) : null}
                      {this.state.currentPage < this.state.nbrPages ? (
                        <Link to="/default/events" className="btn btn-event">
                          NEXT >
                        </Link>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
            <div className="btn-wrapper" style={{ marginTop: "20px" }}>
              <Button
                color="success"
                to="/login-page"
                tag={Link}
                style={{ float: "right" }}
                onClick={saveData}
              >
                Save
              </Button>
              <Button
                className="btn-white"
                color="default"
                to="/register-page"
                tag={Link}
                style={{ float: "right", marginRight: "20px" }}
              >
                Add Page
              </Button>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default DesignSurvey;
