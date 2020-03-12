import React from 'react'
import Axios from 'axios'
import { DEFAULT_URL } from '../../config'
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Alert,
  Modal,
  Button,
} from 'reactstrap'
import classnames from 'classnames'
import InputTextLabel from 'components/Inputs/InputLabel'
import DropDownLabel from 'components/Inputs/DropDownLabel'
import DropzoneExcel from 'components/Dropzone/DropzoneExcel'

class ModalCreateDataset extends React.Component {
  state = {
    token: localStorage.getItem('token'),
    dataset: {},
    fileExcel: {},
    types: [
      { id: 0, title: 'Public' },
      { id: 1, title: 'Private' },
    ],
    id_type: 0,
    extras: {},
    showGlobalWarning: false,
    uploading: false,
    iconTabs: 1,
    plainTabs: 1,
  }
  toBase64 = file => {
    let fileReader = new FileReader()
    fileReader.onload = e => {
      this.setState({
        fileExcel: {
          file: file,
          b64: fileReader.result,
        },
      })
    }
    fileReader.readAsDataURL(file)
  }
  onFilesAdded = file => {
    this.setState({ fileExcel: {} })
    this.toBase64(file)
  }
  toggleNavs = (e, state, index) => {
    e.preventDefault()
    this.setState({
      [state]: index,
    })
  }
  onChange = e =>
    this.setState({
      dataset: { ...this.state.dataset, [e.target.name]: e.target.value },
      disabled: false,
    })
  onChangeType = e => {
    e.preventDefault()
    this.setState({ id_type: e.target.id })
  }
  createProject = e => {
    e.preventDefault()
    if (!this.state.dataset.title) {
      this.setState({
        extras: {
          ...this.state.extras,
          title: 'The title should not be blank!',
        },
      })
      return
    }
    this.setState({ uploading: true, extras: {}, errorMessage: undefined })
    const config = {
      headers: { Authorization: 'bearer ' + this.state.token },
    }
    let data = {
      name: this.state.dataset.title,
      description: this.state.dataset.description,
      privacy: this.state.id_type,
    }
    if (this.state.iconTabs === 2 && this.state.fileExcel.file) {
      data.fileExcel = { file: this.state.fileExcel.b64 }
    }
    Axios.post(`${DEFAULT_URL}api/current/dataset`, data, config)
      .then(res => {
        this.props.history.push(`/data/mydataset/${res.data.extras.uuid}`)
      })
      .catch(error => {
        this.setState({
          showGlobalWarning: true,
          uploading: false,
          errorMessage: error.response
            ? error.response.data
              ? error.response.data.message
                ? error.response.data.message
                : undefined
              : undefined
            : undefined,
          extras: error.response
            ? error.response.data
              ? error.response.data.extras
                ? error.response.data.extras
                : {}
              : {}
            : {},
        })
      })
  }
  render() {
    const { defaultModal, toggleModal } = this.props
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={defaultModal}
        toggle={() => toggleModal('defaultModal')}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Create Dataset
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal('defaultModal')}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="nav-wrapper">
            <InputTextLabel
              id="title"
              placeholder="Title"
              type="text"
              val={this.state.dataset.title}
              onChange={this.onChange}
              stateError={this.state.extras.name !== undefined}
              errorMessage={this.state.extras.name}
            />
            <DropDownLabel
              id="privacy"
              name="Privacy"
              placeholder={this.state.types[this.state.id_type].title}
              type="text"
              val={this.state.types}
              onChange={this.onChangeType}
            />
            <InputTextLabel
              id="description"
              placeholder="Description"
              type="textarea"
              rows={this.state.iconTabs === 2 ? '2' : '5'}
              val={this.state.dataset.description}
              onChange={this.onChange}
              value
            />
            <Nav
              className="nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              pills
              role="tablist"
            >
              <NavItem>
                <NavLink
                  aria-selected={this.state.iconTabs === 1}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: this.state.iconTabs === 1,
                  })}
                  onClick={e => this.toggleNavs(e, 'iconTabs', 1)}
                  href="#design"
                  role="tab"
                >
                  <i className="ni ni-app mr-2" />
                  Create Survey
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  aria-selected={this.state.iconTabs === 2}
                  className={classnames('mb-sm-3 mb-md-0', {
                    active: this.state.iconTabs === 2,
                  })}
                  onClick={e => this.toggleNavs(e, 'iconTabs', 2)}
                  href="#tokens"
                  role="tab"
                >
                  <i className="ni ni-chart-bar-32 mr-2" />
                  Import Data
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          {this.state.iconTabs == 2 ? (
            <Card className="shadow">
              <CardBody>
                <TabContent
                  activeTab={'iconTabs' + this.state.iconTabs}
                  style={{ margin: '0' }}
                >
                  <TabPane tabId="iconTabs1"></TabPane>
                  <TabPane tabId="iconTabs2">
                    <DropzoneExcel
                      onFilesAdded={this.onFilesAdded}
                      fileExcel={this.state.fileExcel}
                    />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          ) : null}
          {this.state.showGlobalWarning ? (
            <Alert color="danger" style={{ marginTop: '5px' }}>
              <strong>Error!</strong>{' '}
              {this.state.iconTabs === 2
                ? this.state.errorMessage !== undefined
                  ? this.state.errorMessage
                  : 'An error occured!'
                : 'An error occured!'}
            </Alert>
          ) : null}
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={this.createProject}>
            {this.state.uploading ? (
              <React.Fragment>
                <i className="fas fa-spin fa-spinner"></i> Uploading...
              </React.Fragment>
            ) : (
              'Create'
            )}
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal('defaultModal')}
          >
            Close
          </Button>
        </div>
      </Modal>
    )
  }
}

export default ModalCreateDataset
