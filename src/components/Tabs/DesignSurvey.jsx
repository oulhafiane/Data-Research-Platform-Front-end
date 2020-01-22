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
import PageHeader from "components/Survey/PageHeader";

class DesignSurvey extends React.Component {
  state = {
    currentPage: 1,
    extras: {},
    showQuestionError: false,
    newQuestion: { name: "", question: "" },
    newQuestionTypeId: 0,
    uploading: false
  };
  onChange = e =>
    this.setState({
      newQuestion: {
        ...this.state.newQuestion,
        [e.target.name]: e.target.value
      },
      [`${e.target.name}Target`]: e.target,
      extras: { ...this.state.extras, questionError: "An error occured!" },
      showQuestionError: false
    });
  render() {
    const {
      state,
      saveTitle,
      addPage,
      savePageTitle,
      addQuestion,
      editQuestion,
      removeQuestion,
      publishSurvey
    } = this.props;
    let nbrPages =
      this.props.state.dataset.parts.length === 0
        ? 1
        : this.props.state.dataset.parts.length;
    return (
      <>
        <Row className="row-grid justify-content-between align-items-center">
          <Col lg="12">
            <Card className="shadow" >
              <CardHeader className="border-0">
                <SurveyHeader dataset={state.dataset} saveTitle={saveTitle} />
              </CardHeader>
              <CardBody>
                <PageHeader
                  dataset={
                    state.dataset.parts.length === 0
                      ? { title: "", description: "" }
                      : state.dataset.parts[this.state.currentPage - 1] ===
                        undefined
                      ? { title: "", description: "" }
                      : state.dataset.parts[this.state.currentPage - 1]
                  }
                  currentPage={this.state.currentPage}
                  saveTitle={(title, description, callBack, errCallBack) => {
                    savePageTitle(
                      title,
                      description,
                      this.state.currentPage,
                      callBack,
                      errCallBack
                    );
                  }}
                />
                <SurveyBody
                  dataset={
                    state.dataset.parts.length === 0
                      ? { variables: [] }
                      : state.dataset.parts[this.state.currentPage - 1] ===
                        undefined
                      ? { variables: [] }
                      : state.dataset.parts[this.state.currentPage - 1]
                  }
                  editQuestion={(question, index, callBack, errCallBack) => {
                    let ok = true;
                    state.dataset.parts.forEach(part => {
                      part.variables.forEach(variable => {
                        if (variable.name === question.name) ok = false;
                      });
                    });
                    if (!ok) {
                      errCallBack("Variable name already taken.");
                      return;
                    }
                    editQuestion(
                      question,
                      index,
                      this.state.currentPage,
                      callBack,
                      errCallBack
                    );
                  }}
                  removeQuestion={(index, callBack, errCallBack) =>
                    removeQuestion(
                      index,
                      this.state.currentPage,
                      callBack,
                      errCallBack
                    )
                  }
                />
                <Row style={{ marginTop: "30px" }}>
                  <Col>
                    <div className="text-center">
                      Page {this.state.currentPage} / {nbrPages}
                    </div>
                  </Col>
                </Row>
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
                      id="name"
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
                {this.state.showQuestionError ? (
                  <Alert color="danger">
                    <strong>Error!</strong>{" "}
                    {this.state.extras.questionError
                      ? this.state.extras.questionError
                      : "An error occured!"}
                  </Alert>
                ) : null}
                <Row>
                  <Col>
                    <div className="text-center">
                      <Link
                        to="#"
                        className="btn btn-event"
                        style={
                          this.state.currentPage <= 1
                            ? {
                                pointerEvents: "none",
                                backgroundColor: "#cccccc",
                                color: "#666666"
                              }
                            : null
                        }
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            currentPage:
                              this.state.currentPage > 1
                                ? this.state.currentPage - 1
                                : 1
                          });
                        }}
                      >
                        <i className="fas fa-angle-left" /> PREVIOUS
                      </Link>
                      <Link
                        to="#add"
                        onClick={e => {
                          e.preventDefault();
                          if (
                            !this.state.newQuestion.question ||
                            !this.state.newQuestion.name
                          ) {
                            this.setState({
                              showQuestionError: true,
                              extras: {
                                questionError:
                                  "The variable name or question is empty!"
                              }
                            });
                            return;
                          }
                          let ok = true;
                          state.dataset.parts.forEach(part => {
                            part.variables.forEach(variable => {
                              if (variable.name === this.state.newQuestion.name)
                                ok = false;
                            });
                          });
                          if (!ok) {
                            this.setState({
                              showQuestionError: true,
                              extras: {
                                questionError: "Variable name already taken."
                              }
                            });
                            return;
                          }
                          addQuestion(
                            {
                              question: this.state.newQuestion.question,
                              name: this.state.newQuestion.name,
                              type: this.state.newQuestionTypeId
                            },
                            this.state.currentPage,
                            () => this.setState({ uploading: false }),
                            err => {
                              this.setState({
                                showQuestionError: true,
                                extras: {
                                  ...this.state.extras,
                                  questionError: err
                                },
                                uploading: false
                              });
                            }
                          );
                          this.setState(
                            {
                              newQuestion: { name: "", question: "" },
                              newQuestionTypeId: 0,
                              uploading: true
                            },
                            () => {
                              this.state.nameTarget.value = "";
                              this.state.questionTarget.value = "";
                            }
                          );
                        }}
                        className="btn btn-event"
                      >
                        {this.state.uploading ? (
                          <React.Fragment>
                            <i className="fas fa-spin fa-spinner"></i>{" "}
                            Uploading...
                          </React.Fragment>
                        ) : (
                          <>
                            <i className="fas fa-plus"></i> ADD Question
                          </>
                        )}
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-event"
                        style={
                          this.state.currentPage >= nbrPages
                            ? {
                                pointerEvents: "none",
                                backgroundColor: "#cccccc",
                                color: "#666666"
                              }
                            : null
                        }
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            currentPage:
                              this.state.currentPage < nbrPages
                                ? this.state.currentPage + 1
                                : nbrPages
                          });
                        }}
                      >
                        NEXT <i className="fas fa-angle-right" />
                      </Link>
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
                onClick={publishSurvey}
              >
                Publish Survey
              </Button>
              <Button
                color="primary"
                to="#"
                onClick={e => {
                  e.preventDefault();
                  addPage(this.state.currentPage + 1, () => {
                    this.setState(
                      {
                        nbrPages: nbrPages + 1
                      },
                      () => this.setState({ currentPage: this.state.nbrPages })
                    );
                  });
                }}
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
