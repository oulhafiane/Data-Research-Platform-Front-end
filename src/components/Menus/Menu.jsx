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
import React from 'react'
import Axios from 'axios'
import { DEFAULT_URL } from '../../config'

// reactstrap components
import { Row, Col, FormGroup, Modal, Button } from 'reactstrap'
import SelectLabel from 'components/Inputs/SelectLabel'
import CreatableSelectLabel from 'components/Inputs/CreatableSelectLabel'

const createOption = label => ({
  label,
  value: label,
})

class Menu extends React.Component {
  state = {
    categories: {},
    searchers: {},
    categoriesSelected: [],
    subCategoriesSelected: [],
    researchersSelected: [],
    keywordsSelected: [],
    orderBy: '2',
    sortBy: '1',
    inputValue: '',
  }

  handleChange = (value, actionMeta) => {
    this.setState({ keywordsSelected: value ? value : [] })
  }

  handleInputChange = inputValue => {
    this.setState({ inputValue })
  }

  handleKeyDown = event => {
    const { inputValue } = this.state
    if (!inputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({
          inputValue: '',
          keywordsSelected: [
            ...this.state.keywordsSelected,
            createOption(inputValue),
          ],
        })
        event.preventDefault()
      default:
        return
    }
  }

  onChangeCategories = e => {
    this.setState({
      categoriesSelected: e ? e : [],
      disabled: false,
    })
  }

  onChangeSubCategories = e => {
    this.setState({
      subCategoriesSelected: e ? e : [],
      disabled: false,
    })
  }

  onChangeSearchers = e => {
    this.setState({
      researchersSelected: e ? e : [],
      disabled: false,
    })
  }

  onChangeSort = e => {
    this.setState({
      sortBy: e.currentTarget.value,
    })
  }

  onChangeOrder = e => {
    this.setState({
      orderBy: e.currentTarget.value,
    })
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    })
  }

  newProblematic = e => {
    e.preventDefault()
    this.props.history.push('/default/new')
  }

  getCategories = () => {
    Axios.get(`${DEFAULT_URL}api/categories`)
      .then(res => {
        this.setState({ categories: res ? res.data : [] })
      })
      .catch(e => console.log(e.response.data))
  }

  getSearchers = () => {
    Axios.get(`${DEFAULT_URL}api/profile/all`)
      .then(res => {
        this.setState({ searchers: res ? res.data : [] })
      })
      .catch(e => console.log(e.response.data))
  }

  componentDidMount() {
    this.getCategories()
    this.getSearchers()
  }

  filter = e => {
    e.preventDefault()
    let sort = this.state.sortBy === '1' ? 'VOTES' : 'DATE'
    let order = this.state.orderBy === '2' ? 'DESC' : 'ASC'
    let dataFilter = {
      searchers: this.state.researchersSelected.map((val, key) => val.value),
      categories: this.state.categoriesSelected.map((val, key) => val.value),
      subCategories: this.state.subCategoriesSelected.map(
        (val, key) => val.value,
      ),
      keywords: this.state.keywordsSelected.map((val, key) => val.value),
    }
    this.props.onFilter(sort, order, dataFilter)
    this.toggleModal('defaultModal')
  }

  render() {
    const groupStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }
    const groupBadgeStyles = {
      backgroundColor: '#EBECF0',
      borderRadius: '2em',
      color: '#172B4D',
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1',
      minWidth: 1,
      padding: '0.16666666666667em 0.5em',
      textAlign: 'center',
    }
    const formatGroupLabel = data => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    )
    return (
      <>
        <Row style={{ margin: '-80px 15px 30px' }}>
          {/* Menu */}
          <Col lg="14">
            <Button color="info" href="#pablo" onClick={this.newProblematic}>
              <i className="fas fa-plus"></i> Create
            </Button>
            <Button
              color="info"
              onClick={() => this.toggleModal('defaultModal')}
            >
              <i className="fas fa-filter"></i> Filter
            </Button>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal('defaultModal')}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Advanced Search
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal('defaultModal')}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <SelectLabel
                  id="categories"
                  placeholder="Categories"
                  type="text"
                  selected={this.state.categoriesSelected}
                  val={Object.keys(this.state.categories).map(key => ({
                    value: this.state.categories[key].id,
                    label: this.state.categories[key].title,
                  }))}
                  onChange={this.onChangeCategories}
                />
                <SelectLabel
                  id="subCategories"
                  placeholder="Sub-Categories"
                  type="text"
                  selected={this.state.subCategoriesSelected}
                  val={Object.keys(this.state.categories).map(key => ({
                    label: this.state.categories[key].title,
                    options: this.state.categories[key].sub_categories.map(
                      (val, key) => ({
                        value: val.id,
                        label: val.title,
                      }),
                    ),
                  }))}
                  formatGroupLabel={formatGroupLabel}
                  onChange={this.onChangeSubCategories}
                />
                <SelectLabel
                  id="domains"
                  placeholder="Researchers"
                  type="text"
                  selected={this.state.researchersSelected}
                  val={Object.keys(this.state.searchers).map(key => ({
                    value: this.state.searchers[key].uuid,
                    label: `${this.state.searchers[key].firstName} ${this.state.searchers[key].lastName}`,
                  }))}
                  onChange={this.onChangeSearchers}
                />
                <CreatableSelectLabel
                  id="keywords"
                  placeholder="Keywords"
                  selected={this.state.keywordsSelected}
                  val={this.state.inputValue}
                  onChange={this.handleChange}
                  onInputChange={this.handleInputChange}
                  onKeyDown={this.handleKeyDown}
                  menuIsOpen={false}
                />
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="custom-radio-1"
                  >
                    Sort Result By
                  </label>
                  <Row style={{ width: '300px', margin: '0 auto' }}>
                    <Col md="6">
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="radioVotes"
                          defaultChecked={
                            this.state.sortBy === '1' ? true : false
                          }
                          name="radioSort"
                          type="radio"
                          value="1"
                          onChange={this.onChangeSort}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="radioVotes"
                        >
                          <span>Votes</span>
                        </label>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="radioDate"
                          defaultChecked={
                            this.state.sortBy === '2' ? true : false
                          }
                          name="radioSort"
                          type="radio"
                          value="2"
                          onChange={this.onChangeSort}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="radioDate"
                        >
                          <span>Date</span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="custom-radio-1"
                  >
                    Order Result By
                  </label>
                  <Row style={{ width: '300px', margin: '0 auto' }}>
                    <Col md="6">
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="radioAscending"
                          defaultChecked={
                            this.state.orderBy === '1' ? true : false
                          }
                          name="radioOrder"
                          type="radio"
                          value="1"
                          onChange={this.onChangeOrder}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="radioAscending"
                        >
                          <span>Ascending</span>
                        </label>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="custom-control custom-radio mb-3">
                        <input
                          className="custom-control-input"
                          id="radioDescending"
                          defaultChecked={
                            this.state.orderBy === '2' ? true : false
                          }
                          name="radioOrder"
                          type="radio"
                          value="2"
                          onChange={this.onChangeOrder}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="radioDescending"
                        >
                          <span>Descending</span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button" onClick={this.filter}>
                  Save changes
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal('defaultModal')}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    )
  }
}

export default Menu
