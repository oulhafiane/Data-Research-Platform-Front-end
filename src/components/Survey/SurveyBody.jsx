import React from "react";
import DisplayQuestions from "./DisplayQuestions";

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
  typeRender = (val, key, editQuestion, removeQuestion) => {
    const type = (val.type === 5 ||
      val.type === 7 ||
      val.type === 8) ? '' : 'textarea';
    return (
      <DisplayQuestions
        type={type}
        key={key}
        val={val}
        index={key}
        editQuestion={editQuestion}
        removeQuestion={removeQuestion}
        showEditIndex={this.state.showEditIndex}
        changeShowEditIndex={this.changeShowEditIndex}
      />
    );
  }
  render() {
    const { dataset, editQuestion, removeQuestion } = this.props;
    return (
      <>
        {dataset.variables.map((val, key) => {
          // console.log('val ==> , key ==> \n', val, key)
          return this.typeRender(val, key, editQuestion, removeQuestion)
        })}
      </>
    );
  }
}

export default SurveyBody;
