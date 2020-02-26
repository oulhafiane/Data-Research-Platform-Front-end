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
import Axios from "axios";
import { DEFAULT_URL } from "../../config";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
  Col
} from "reactstrap";
import SelectionModal from "./MLTabSrcs/SelectionModal";
import { ML_URL } from '../../config'
import DeleteModal from "./MLTabSrcs/DeleteModal";

class MachineLearning extends React.Component {
  state = {
    currentPage: 1,
    boolean_1: false,
    boolean_2: false,
    selectedFeature: null,
    selectedTarget: null,
    modelname: '',
    checkbox: false,
    loading: false,
    showError: false
  };

  modelNameOnChange = value => {
    this.setState({ modelname: value })
  }

  handleFeatureChange = selectedFeature => {
    this.setState(
      { selectedFeature: selectedFeature },
    );
  };

  handleTargetChange = selectedTarget => {
    this.setState(
      { selectedTarget }
    );
  }

  CheckBoxOnChange = (variables) => {

    this.setState({
      checkbox: !this.state.checkbox
    }, () => {
      this.setState({
        selectedFeature: (this.state.checkbox === true) ? variables : null
      })
    })
  }

  toggle = (flag) => {
    if (flag === 1) {
      this.setState(
        {
          boolean_1: !this.state.boolean_1,
          selectedFeature: null,
          selectedTarget: null,
          modelname: '',
          checkbox: false,
          loading: false,
          showError: false
        }
      );
    } else if (flag === 2) {
      this.setState({
        boolean_2: !this.state.boolean_2,
      })
    }

  };

  createModel = () => {
    return new Promise((resolve, reject) => {
      const { selectedFeature, selectedTarget, modelname } = this.state
      const { uuid } = this.props
      if (selectedTarget !== null &&
        selectedFeature !== null &&
        selectedFeature.length > 0 &&
        selectedTarget !== null &&
        modelname.length > 0) {
        const url = `${ML_URL}training`
        const data = {
          modelname,
          selectedFeature: selectedFeature.map(elem => {
            return elem.value
          }),
          selectedTarget: selectedTarget.value,
          uuid,
        }
        this.setState({ loading: true })
        Axios.post(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: data
        })
          .then(res => {
            // console.log("res ========> ", res.data);
            const data = JSON.parse(res.data)
            this.setState(
              {
                loading: false,
                showMl: true,
                columns: data["columns"],
                rows: data["index"],
                data: data["data"]
              }
            )
            resolve("succes")
          }
          )
          .catch(err => {
            console.log(err)
            this.setState({
              loading: false
            })
          });
      } else {
        this.setState({
          showError: true
        })
        reject("failed")
      }
    })
  };

  render() {
    const { state, gotoTokenPage } = this.props;
    const { variables } = this.props
    const {
      boolean_1,
      boolean_2,
      selectedFeature,
      selectedTarget,
      loading,
      showError
    } = this.state

    let paginations = [];
    for (let i = 0; i < state.tokens.nbPages; i++) {
      paginations.push(
        <PaginationItem
          key={i}
          className={i + 1 === state.tokens.currentPage ? "active" : ""}
        >
          <PaginationLink
            href="#pablo"
            onClick={e => {
              e.preventDefault();
              this.props.gotoTokenPage(i + 1);
            }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return (
      <>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Machine learning models</h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Uuid</th>
                <th scope="col">Model name</th>
                <th scope="col">Target</th>
                <th scope="col">Status</th>
                <th scope="col">Privacy</th>
                <th scope="col">Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {state.tokens.tokens.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.uuid}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{val.privacy === 0 ? "Public" : "Private"}</td>
                    <td>{val.creation_date}</td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                          // onClick={() => this.getToken(val.uuid)}
                          >
                            Download
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={() =>
                              this.setState({ toDelete: val.uuid }, () =>
                                this.toggle(2)
                              )
                            }
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <Row>
              <Col lg="6">
                <nav aria-label="...">
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        // style={{ backgroundColor: "#2dce89", color: "#fff" }}
                        onClick={e => {
                          e.preventDefault();
                          this.toggle(1);
                        }}
                      >
                        <i className="ni ni-fat-add" />
                        <span className="sr-only">+</span>
                      </PaginationLink>
                    </PaginationItem>

                    <PaginationItem
                      style={{ marginLeft: "5px", marginTop: "6px" }}
                    >
                      Total: {state.tokens.itemsCount}
                    </PaginationItem>
                  </Pagination>
                </nav>
                <DeleteModal
                  boolean={boolean_2}
                  toggle={this.toggle}
                />
                <SelectionModal
                  boolean={boolean_1}
                  toggle={this.toggle}
                  selectedFeature={selectedFeature}
                  selectedTarget={selectedTarget}
                  createModel={this.createModel}
                  handleFeatureChange={this.handleFeatureChange}
                  handleTargetChange={this.handleTargetChange}
                  CheckBoxOnChange={this.CheckBoxOnChange}
                  modelNameOnChange={this.modelNameOnChange}
                  variables={variables}
                  loading={loading}
                  showError={showError}
                />
              </Col>
              <Col lg="6">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          gotoTokenPage(1);
                        }}
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {paginations}
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          gotoTokenPage(state.tokens.nbPages);
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </>
    );
  }
}

export default MachineLearning;