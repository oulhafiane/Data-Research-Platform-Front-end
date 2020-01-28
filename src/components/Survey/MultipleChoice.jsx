import React, { Component } from 'react';
import MCollapse from '../Tabs/Collapse'
import PropTypes from 'prop-types';

class MultipleChoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            multipleChoiceCollapse: false,
            multipleChoiceArray: [],
            indexOfNewFieldAdded: null
        }
    }
    componentDidMount() {
        const { val, fillmultipleChoiceArray } = this.props

        if (val.options !== undefined && val.options !== null) {
            this.setState({
                multipleChoiceArray: val.options.map((elem, index) => {
                    return {
                        id: index,
                        value: elem
                    }
                })
            }, () => fillmultipleChoiceArray(this.state.multipleChoiceArray))
        }
    }
    // add new field for input multiple choice 
    addField = (id, flag) => {
        const { multipleChoiceArray } = this.state
        const { updatemultipleChoiceArray } = this.props

        try {
            if (multipleChoiceArray && multipleChoiceArray.length != 0) {
                let newArray = multipleChoiceArray
                newArray.splice(id + 1, 0, { id: id + 1, value: '' })
                this.setState({
                    multipleChoiceArray: newArray,
                    indexOfNewFieldAdded: (flag) ? id + 1 : null
                }, () => this.setState({
                    multipleChoiceArray: this.state.multipleChoiceArray.map((elem, index) => {
                        return {
                            id: index,
                            value: elem.value
                        }
                    }, () => updatemultipleChoiceArray(this.state.multipleChoiceArray))
                }))
            }
        }
        catch { }
    }
    // input on Change in multiple choice
    inputOnChange = (e, id) => {
        const { updatemultipleChoiceArray } = this.props

        e.preventDefault()
        this.setState({
            multipleChoiceArray: this.state.multipleChoiceArray.map((elem) => {
                if (id === elem.id) {
                    return {
                        id: id,
                        value: e.target.value
                    }
                }
                return elem
            })
        }, () => updatemultipleChoiceArray(this.state.multipleChoiceArray))

    }
    // multiple choice del existed input field
    delField = (id) => {
        const { updatemultipleChoiceArray } = this.props

        this.setState({
            multipleChoiceArray: this.state.multipleChoiceArray.filter((elem) => {
                return id !== elem.id
            })
        }, () => {
            this.setState({
                multipleChoiceArray: this.state.multipleChoiceArray.map((elem, index) => {
                    return {
                        id: index,
                        value: elem.value
                    }
                })
            }, () => updatemultipleChoiceArray(this.state.multipleChoiceArray))
        })

    }
    // reset index of new filed add in last list of input multiple choice 
    resetIndexOfNewFieldAdded = () => {
        this.setState({ indexOfNewFieldAdded: null })
    }

    render() {
        const { multipleChoiceArray } = this.state

        return (
            <div>
                <MCollapse
                    isOpen={true}
                    multipleChoiceArray={multipleChoiceArray}
                    addField={this.addField}
                    delField={this.delField}
                    inputOnChange={this.inputOnChange}
                    indexOfNewFieldAdded={this.state.indexOfNewFieldAdded}
                    resetIndexOfNewFieldAdded={this.resetIndexOfNewFieldAdded}
                />
            </div>
        );
    }
}

MultipleChoice.propTypes = {
    fillmultipleChoiceArray: PropTypes.func.isRequired,
    val: PropTypes.object.isRequired
};

export default MultipleChoice;