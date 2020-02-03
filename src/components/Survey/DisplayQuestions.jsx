import React from 'react'
import InputTextLabel from 'components/Inputs/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import MultipleChoice from './MultipleChoice'
import DropDownLabel from 'components/Inputs/DropDownLabel'
import { TYPES_DATA } from 'config'
// reactstrap components
import {
  Input,
  Button,
  Alert,
  Modal,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'

class DisplayQuestions extends React.Component {
  state = {
    extras: {},
    hoverIndex: -1,
    question: {
      question: this.props.val.question,
      name: this.props.val.name,
      type: this.props.val.type,
    },
    editing: false,
    deleting: false,
    // this bellow for multiple choice
    multipleChoiceArray: [],
  }

  fillmultipleChoiceArray = arrayOfChoices => {
    // console.log("fillmultipleChoiceArray ==> ", arrayOfChoices)
    this.setState({
      multipleChoiceArray: arrayOfChoices,
    })
  }

  updatemultipleChoiceArray = arrayOfChoices => {
    // console.log("updatemultipleChoiceArray ==> ", arrayOfChoices)
    this.setState({
      multipleChoiceArray: arrayOfChoices,
    })
  }

  onChange = e => {
    e.preventDefault()
    this.setState({
      question: { ...this.state.question, [e.target.name]: e.target.value },
    })
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    })
  }

  inputTypeRender = (indexOfInputType, name, type, options) => {
    if (
      indexOfInputType === 0 ||
      indexOfInputType === 1 ||
      indexOfInputType === 2 ||
      indexOfInputType === 3
    ) {
      return (
        <ListGroup>
          {options !== undefined &&
            options.map((elem, index) => {
              return (
                <ListGroupItem
                  style={{
                    backgroundColor: '#e9ecef',
                    padding: 0,
                  }}
                  key={index}
                >
                  <IconButton>
                    <RadioButtonUncheckedIcon />
                  </IconButton>
                  {elem}
                </ListGroupItem>
              )
            })}
        </ListGroup>
      )
    } else if (indexOfInputType === 4) {
      return (
        <Row>
          <Col fg="4">
            <div
              style={{
                border: '1px solid #cad1d7',
                borderRadius: '0.25rem',
                backgroundColor: '#e9ecef',
              }}
            >
              <FormControlLabel
                style={{ marginLeft: '1%' }}
                disabled
                control={<Switch value="checkedD" />}
                label="Yes/No"
              />
            </div>
          </Col>
          <Col fg="4"></Col>
          <Col fg="4"></Col>
        </Row>
      )
    } else if (
      indexOfInputType === 5 ||
      indexOfInputType === 6 ||
      indexOfInputType === 7 ||
      indexOfInputType === 8
    ) {
      return (
        <Input type={type} style={{ cursor: 'pointer' }} name={name} disabled />
      )
    } else if (indexOfInputType === 9) {
      return (
        <div style={{ marginTop: 10 }}>
          <h4 style={{ fontSize: '1vw' }}>Date / Time</h4>
          <Row>
            <Col fg="4">
              <Input
                placeholder="MM/DD/YYYY"
                style={{ cursor: 'pointer' }}
                disabled
              />
            </Col>
            <Col fg="4">
              <Input
                placeholder="HH : MM"
                style={{ cursor: 'pointer' }}
                disabled
              />
            </Col>
            <Col fg="4"></Col>
            <Col fg="4"></Col>
          </Row>
        </div>
      )
    } else if (indexOfInputType === 10) {
      return (
        <div style={{ marginTop: 10 }}>
          <h4 style={{ fontSize: '1vw' }}>Date</h4>
          <Row>
            <Col fg="4">
              <Input
                placeholder="MM/DD/YYYY"
                style={{ cursor: 'pointer' }}
                disabled
              />
            </Col>
            <Col fg="4"></Col>
            <Col fg="4"></Col>
            <Col fg="4"></Col>
          </Row>
        </div>
      )
    } else if (indexOfInputType === 11) {
      return (
        <div style={{ marginTop: 10 }}>
          <h4 style={{ fontSize: '1vw' }}>Time</h4>
          <Row>
            <Col fg="4">
              <Input
                placeholder="HH : MM"
                style={{ cursor: 'pointer' }}
                disabled
              />
            </Col>
            <Col fg="4"></Col>
            <Col fg="4"></Col>
            <Col fg="4"></Col>
          </Row>
        </div>
      )
    }
  }

  render() {
    const {
      val,
      index,
      editQuestion,
      removeQuestion,
      showEditIndex,
      changeShowEditIndex,
      // type of input textbox or textarea
      type,
    } = this.props

    return (
      <div>
        {showEditIndex !== index ? (
          <div
            style={{
              padding: '20px',
              cursor: 'pointer',
              marginTop: '30px',
              marginBottom: '20px',
              backgroundColor: `${
                this.state.hoverIndex === index
                  ? 'rgba(0, 0, 0, 0.10)'
                  : 'rgba(0, 0, 0, 0)'
              }`,
            }}
            onMouseOver={() =>
              this.setState({
                hoverIndex: index,
              })
            }
            onMouseLeave={() =>
              this.setState({
                hoverIndex: -1,
              })
            }
            onClick={e => {
              if (e.target.value === 'delete') return
              changeShowEditIndex(index)
            }}
          >
            <h3 className="mb-0">
              {index + 1}) {val.question}
              {this.state.hoverIndex === index ? (
                <>
                  <Button
                    style={{
                      marginBottom: '5px',
                      float: 'right',
                      height: '41px',
                    }}
                    color="danger"
                    value="delete"
                    onClick={() => this.toggleModal('notificationModal')}
                  >
                    {this.state.deleting ? (
                      <React.Fragment>
                        <i className="fas fa-spin fa-spinner"></i> Deleting...
                      </React.Fragment>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                  <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={this.state.notificationModal}
                    toggle={() => this.toggleModal('notificationModal')}
                  >
                    <div className="modal-header">
                      <h6 className="modal-title" id="modal-title-notification">
                        Your attention is required
                      </h6>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal('notificationModal')}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="py-3 text-center">
                        <i className="ni ni-bell-55 ni-3x" />
                        <h4 className="heading mt-4">
                          Are you sure you want to permanently delete this ?
                        </h4>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button
                        className="btn-white"
                        color="default"
                        type="button"
                        onClick={() => {
                          this.setState({ deleting: true })
                          removeQuestion(
                            index,
                            () => this.setState({ deleting: false }),
                            err =>
                              this.setState({
                                showGlobalWarning: true,
                                error: err,
                                deleting: false,
                              }),
                          )
                          this.toggleModal('notificationModal')
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        className="text-white ml-auto"
                        color="link"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal('notificationModal')}
                      >
                        Close
                      </Button>
                    </div>
                  </Modal>
                  <Button
                    style={{
                      marginRight: '5px',
                      marginBottom: '5px',
                      float: 'right',
                      height: '41px',
                    }}
                    color="default"
                    onClick={() => {
                      changeShowEditIndex(index)
                      this.setState({
                        hoverIndex: -1,
                      })
                    }}
                  >
                    Edit
                  </Button>
                </>
              ) : null}
            </h3>
            {this.inputTypeRender(val.type, val.name, type, val.options)}
          </div>
        ) : null}

        {showEditIndex === index ? (
          <div className="modal-body">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => changeShowEditIndex(-1)}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <Row>
              <Col lg="6">
                <InputTextLabel
                  id="question"
                  placeholder="Question"
                  type="text"
                  val={this.state.question.question}
                  onChange={this.onChange}
                />
              </Col>
              <Col lg="3">
                <InputTextLabel
                  id="name"
                  placeholder="Variable Name"
                  type="text"
                  val={this.state.question.name}
                  onChange={this.onChange}
                />
              </Col>
              <Col lg="3">
                <DropDownLabel
                  id="type"
                  name="Type"
                  placeholder={TYPES_DATA[val.type].title}
                  val={{}}
                  type="text"
                  disabled={true}
                />
              </Col>
            </Row>
            {/* mutiple choice  */}
            {val.type === 0 ||
            val.type === 1 ||
            val.type === 2 ||
            val.type === 3 ? (
              <MultipleChoice
                val={val}
                fillmultipleChoiceArray={this.fillmultipleChoiceArray}
                updatemultipleChoiceArray={this.updatemultipleChoiceArray}
              />
            ) : null}
            {/* To check what to do with this globalWarning */}
            {this.state.showGlobalWarning ? (
              <Alert color="danger">
                <strong>Error!</strong>{' '}
                {this.state.error ? this.state.error : 'An error occured!'}
              </Alert>
            ) : null}
            <Button
              color="primary"
              type="button"
              style={{ float: 'right' }}
              onClick={e => {
                e.preventDefault()
                if (
                  !this.state.question.question ||
                  !this.state.question.name
                ) {
                  this.setState({
                    showGlobalWarning: true,
                    error: 'The variable name or question is empty!',
                  })
                  return
                }
                this.setState({ editing: true })
                editQuestion(
                  this.state.multipleChoiceArray,
                  this.state.question,
                  index,
                  () => {
                    changeShowEditIndex(-1)
                    this.setState({
                      editing: false,
                      showGlobalWarning: false,
                      error: undefined,
                    })
                  },
                  err => {
                    this.setState({
                      showGlobalWarning: true,
                      error: err,
                      editing: false,
                    })
                  },
                )
                this.setState({ multipleChoiceArray: [] })
              }}
            >
              {/* When data will be saved in the server you must add this option Uploading */}
              {this.state.editing ? (
                <React.Fragment>
                  <i className="fas fa-spin fa-spinner"></i> Editing...
                </React.Fragment>
              ) : (
                'Save'
              )}
            </Button>
            <Button
              color="link"
              type="button"
              style={{ float: 'right' }}
              onClick={() => changeShowEditIndex(-1)}
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    )
  }
}

export default DisplayQuestions
