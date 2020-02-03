import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import {
  Card,
  CardFooter,
  FormFeedback,
  Row,
  CardBody,
  Collapse,
  Button,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import './index.css'

const emptyfieldColor = {
  control: styles => ({ ...styles, borderColor: 'red' }),
}

class MCollapse extends Component {
  state = {
    loading: false,
  }
  render() {
    const {
      isOpen,
      multipleChoiceArray,
      addField,
      delField,
      inputOnChange,
      indexOfNewFieldAdded,
      resetIndexOfNewFieldAdded,
    } = this.props

    // console.log('indexOfNewFieldAdded', indexOfNewFieldAdded)
    // console.log('multipleChoiceArray', multipleChoiceArray)
    // console.log('')]
    return (
      <div>
        <Collapse isOpen={isOpen}>
          <div className="collapsecard">
            {Array.isArray(multipleChoiceArray) &&
              multipleChoiceArray.map((elem, index) => {
                return (
                  <Row key={index}>
                    <Col lg="0">
                      <IconButton>
                        <RadioButtonUncheckedIcon />
                      </IconButton>
                    </Col>
                    <Col lg="10">
                      <FormGroup>
                        <Input
                          className={
                            indexOfNewFieldAdded === elem.id
                              ? 'input'
                              : 'inputfocus'
                          }
                          placeholder="Enter an answer choice"
                          type="text"
                          value={elem.value}
                          onChange={e => {
                            inputOnChange(e, elem.id)
                          }}
                          onClick={e => {
                            e.preventDefault()
                            function lastIndexCmp() {
                              const obj =
                                multipleChoiceArray[
                                  multipleChoiceArray.length - 1
                                ]
                              if (obj.id) return obj.id
                              else return null
                            }
                            if (elem.id == lastIndexCmp()) {
                              addField(elem.id, 0)
                            } else if (indexOfNewFieldAdded !== elem.id) {
                              resetIndexOfNewFieldAdded()
                            }
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="0">
                      <IconButton onClick={() => addField(elem.id, 1)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Col>
                    {multipleChoiceArray.length === 1 ? null : (
                      <Col lg="0">
                        <IconButton
                          onClick={() => {
                            delField(elem.id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Col>
                    )}
                  </Row>
                )
              })}
            {/* <IconButton >
                            <AddCircleOutlineIcon />
                        </IconButton> */}
          </div>
          {/* <Card >
                        <CardBody>
                            {multipleChoiceFieldsNbr.map((el, index) => {
                                return (
                                    <Row>
                                        <Col lg="11">
                                            <FormGroup>
                                                <Input
                                                    placeholder="Enter an answer choice"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="1">
                                            D
                                        </Col>
                                    </Row>
                                )
                            })}
                        </CardBody>
                    </Card> */}
        </Collapse>
      </div>
    )
  }
}

MCollapse.propTypes = {}
export default MCollapse
