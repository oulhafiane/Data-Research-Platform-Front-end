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
import { Link } from 'react-router-dom'
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js'
import SharedNavbar from './SharedNavbar'
import { connect } from 'react-redux'
import { getUser } from 'actions/userAction'

// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  Nav,
} from 'reactstrap'
import authService from 'services/auth-service'
import MyProfile from './MyProfile'

class DefaultNavbar extends React.Component {
  async componentDidMount() {
    let headroom = new Headroom(document.getElementById('navbar-main'))
    // initialise
    headroom.init()
    await this.props.getUser()
  }
  render() {
    const { styleBrand } = this.props
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <NavbarBrand
              className="mr-lg-5"
              to="/"
              tag={Link}
              style={styleBrand}
            >
              <img alt="..." src={require('assets/img/brand/impactree.png')} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar_global">
              <SharedNavbar />
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <MyProfile
                  user={this.props.user}
                  photo_user={this.props.photo_user}
                />
              </Nav>
            </UncontrolledCollapse>
          </Navbar>
        </header>
      </>
    )
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user,
  user: state.user.user,
})

export default connect(mapStateProps, { getUser })(DefaultNavbar)
