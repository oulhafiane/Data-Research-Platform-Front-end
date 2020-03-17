/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from 'react'
import { withRouter } from 'react-router'
import ClickOutside from '../Other/ClickOutSide'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import Axios from 'axios'
import { DEFAULT_URL } from '../../config'
// reactstrap components
import { Modal, Alert, Button } from 'reactstrap'
import InputTextLabel from 'components/Inputs/InputLabel'
import DropDownLabel from 'components/Inputs/DropDownLabel'
import ModalCreateDataset from 'components/Modals/ModalCreateDataset'

class DataSidebar extends React.Component {
  state = {
    expanded: false,
    token: localStorage.getItem('token'),
    datasets: [],
    defaultModal: false,
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state],
    })
  }
  loadDatasets = () => {
    const config = {
      headers: { Authorization: 'bearer ' + this.state.token },
    }
    Axios.get(`${DEFAULT_URL}api/current/dataset?limit=50/`, config)
      .then(res => {
        this.setState(prevState => ({
          datasets: [...prevState.datasets, ...res.data.datasets],
        }))
      })
      .catch(error => {
        console.log(error.response)
      })
  }
  componentDidMount() {
    this.loadDatasets()
  }
  render() {
    return (
      <>
        <ModalCreateDataset
          defaultModal={this.state.defaultModal}
          toggleModal={this.toggleModal}
          history={this.props.history}
        />
        <ClickOutside
          onClickOutside={() => {
            this.setState({ expanded: false })
          }}
        >
          <SideNav
            className="navbar-vertical fixed-left navbar-light bg-default"
            expanded={this.state.expanded}
            onToggle={expanded => {
              this.setState({ expanded })
            }}
            onSelect={selected => {
              if (selected === 'add') {
                this.toggleModal('defaultModal')
                return
              }
              const to = '/' + selected
              if (location.pathname !== to) {
                this.props.history.push(to)
              }
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="data/index">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: '1.75em' }}
                  />
                </NavIcon>
                <NavText>Home</NavText>
              </NavItem>
              <NavItem eventKey="charts">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-database"
                    style={{ fontSize: '1.75em' }}
                  />
                </NavIcon>
                <NavText>My Datasets</NavText>
                {this.state.datasets.map((value, key) => {
                  return (
                    <NavItem
                      key={key}
                      eventKey={`data/mydataset/${value.uuid}`}
                    >
                      <NavText>{value.name}</NavText>
                    </NavItem>
                  )
                })}
                <NavItem eventKey="data/mydatasets">
                  <NavText>All My Datasets</NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey="add">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-plus"
                    style={{ fontSize: '1.75em' }}
                  />
                </NavIcon>
                <NavText>Create Dataset</NavText>
              </NavItem>
            </SideNav.Nav>
          </SideNav>
        </ClickOutside>
      </>
    )
  }
}

export default withRouter(DataSidebar)
