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
// reactstrap components
import { Container } from "reactstrap";
import Axios from "axios";
import MlResult from "./MLTabSrcs/MlResult";
import CardsAndModal from "./MLTabSrcs/CardsAndModal";
import { ML_URL } from '../../config'

class MachineLearning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      rows: null,
      data: null,
      showMl: false,
      modal: false,
      selectedFeature: null,
      selectedTarget: null,
      modelname: '',
      checkbox: false,
      loading: false
    };
  }
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
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  showMlResult = () => {
    const { selectedFeature, selectedTarget, modelname } = this.state
    const { uuid } = this.props
    // if (selectedTarget !== null &&
    //   selectedFeature !== null &&
    //   selectedFeature.length > 0 &&
    //   selectedTarget !== null &&
    //   modelname.length > 0) {
    const url = `${ML_URL}training`
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
  render() {
    const {
      columns,
      rows,
      data,
      showMl,
      modal,
      selectedFeature,
      selectedTarget,
      loading
    } = this.state;
    const { variables } = this.props
    return (
      <Container>
        {!showMl ? (
          <CardsAndModal
            toggle={this.toggle}
            modal={modal}
            selectedFeature={selectedFeature}
            selectedTarget={selectedTarget}
            showMlResult={this.showMlResult}
            handleFeatureChange={this.handleFeatureChange}
            handleTargetChange={this.handleTargetChange}
            CheckBoxOnChange={this.CheckBoxOnChange}
            modelNameOnChange={this.modelNameOnChange}
            variables={variables}
            loading={loading}
          />
        ) : (
            <MlResult data={data} columns={columns} rows={rows} />
          )}
      </Container>
    );
  }
}

export default MachineLearning;
