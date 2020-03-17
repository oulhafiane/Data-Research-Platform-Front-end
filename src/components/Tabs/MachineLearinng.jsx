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
  Col,
  Button
} from "reactstrap";
import SelectionModal from "./MLTabSrcs/SelectionModal";
import { ML_URL } from '../../config'
import DeleteModal from "./MLTabSrcs/DeleteModal";
import EditableTable from './MLTabSrcs/Prediction'

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
    showError: false,
    showTb: false,
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
    const { selectedFeature, selectedTarget, modelname } = this.state
    const { uuid } = this.props
    // if (selectedTarget !== null &&
    //   selectedFeature !== null &&
    //   selectedFeature.length > 0 &&
    //   selectedTarget !== null &&
    //   modelname.length > 0) {
    const url = `${ML_URL}training/4deb0c2e-cd53-4d77-a612-a0d23893e423`
    console.log({ url: url })
    const data = {
      modelname,
      // selectedFeature: selectedFeature.map(elem => {
      //   return elem.value
      // }),
      selectedFeature: {
        "data": [
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null },
          { "test1": 1, "test2": 2, "test3": 3, "I": 1, "A": 55, "B": 66 },
          { "test1": 3, "test2": 10, "test3": 22, "I": 4, "A": 33, "B": 433 },
          { "test1": 4, "test2": 33, "test3": 44, "I": 5, "A": 12, "B": 12 },
          { "test1": "5", "test2": "14", "test3": "21", "I": "6", "A": "45", "B": "44" },
          { "test1": "6", "test2": "12", "test3": "11", "I": "10", "A": "33", "B": "55" },
          { "test1": "7", "test2": "55", "test3": "1", "I": null, "A": null, "B": null },
          { "test1": "8", "test2": "43", "test3": "4", "I": null, "A": null, "B": null },
          { "test1": "9", "test2": "33", "test3": "0", "I": null, "A": null, "B": null }
        ]
      },
      // selectedTarget: selectedTarget.value,
      selectedTarget: { "test1": "1" },
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
      }
      )
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      });
    // }
  };
  // createModel = () => {
  //   return new Promise((resolve, reject) => {
  //     const { selectedFeature, selectedTarget, modelname } = this.state
  //     const { uuid } = this.props
  //     if (selectedTarget !== null &&
  //       selectedFeature !== null &&
  //       selectedFeature.length > 0 &&
  //       selectedTarget !== null &&
  //       modelname.length > 0) {
  //       const url = `${ML_URL}training`
  //       const data = {
  //         modelname,
  //         selectedFeature: selectedFeature.map(elem => {
  //           return elem.value
  //         }),
  //         selectedTarget: selectedTarget.value,
  //         uuid,
  //       }
  //       this.setState({ loading: true })
  //       Axios.post(url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Origin': '*'
  //         },
  //         body: data
  //       })
  //         .then(res => {
  //           // console.log("res ========> ", res.data);
  //           const data = JSON.parse(res.data)
  //           this.setState(
  //             {
  //               loading: false,
  //               showMl: true,
  //               columns: data["columns"],
  //               rows: data["index"],
  //               data: data["data"]
  //             }
  //           )
  //           resolve("succes")
  //         }
  //         )
  //         .catch(err => {
  //           console.log(err)
  //           this.setState({
  //             loading: false
  //           })
  //         });
  //     } else {
  //       this.setState({
  //         showError: true
  //       })
  //       reject("failed")
  //     }
  //   })
  // };

  render() {
    const { state, gotoTokenPage } = this.props;
    const { variables } = this.props
    const {
      boolean_1,
      boolean_2,
      selectedFeature,
      selectedTarget,
      loading,
      showError,
      showTb
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
        {showTb === true ?
          <EditableTable />
          : <Card className="shadow">
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
                              onClick={() => {
                                const url = `${ML_URL}tmp/4deb0c2e-cd53-4d77-a612-a0d23893e423`
                                console.log({ url: url })
                                Axios.get(url, {
                                  method: 'GET',
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Origin': '*'
                                  },
                                  data: { data: 'data' }
                                })
                                  .then(res => {
                                    console.log({ res: res })
                                  })
                                  .catch(err => {
                                    console.log({ err: err })
                                  })
                              }
                              }
                            >
                              Download
                        </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={() => this.setState({
                                showTb: true
                              })}
                            >
                              Prediction
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
                  <Button
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      this.toggle(1);
                    }}
                  >
                    Create a model
                  </Button>
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
        }

      </>
    );
  }
}

export default MachineLearning;