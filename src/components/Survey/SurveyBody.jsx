import React from "react";
import InputTextLabel from "components/Inputs/InputLabel";
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Input,
  Button,
  Alert,
  Modal,
  CardBody
} from "reactstrap";
import InputText from "components/Inputs/Input";
import TextBox from "./TextBox";
class SurveyBody extends React.Component {
  state = {
    title: { hover: false, showEdit: false, title: "" },
    extras: {},
    showEditIndex: -1,
    hoverIndex: -1
  };
  changeShowEditIndex = index => {
    this.setState({ showEditIndex: index });
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    const { dataset, editQuestion, removeQuestion } = this.props;
    return (
      <>
        {dataset.variables.map((val, key) => {
          return (
            <TextBox
              key={key}
              val={val}
              index={key}
              editQuestion={editQuestion}
              removeQuestion={removeQuestion}
              showEditIndex={this.state.showEditIndex}
              changeShowEditIndex={this.changeShowEditIndex}
            />
          );
        })}
      </>
    );
  }
}

export default SurveyBody;