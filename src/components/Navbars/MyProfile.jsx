import React from 'react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
  Media,
  Nav,
} from 'reactstrap'
import authService from 'services/auth-service'

class MyProfile extends React.Component {
  render() {
    return (
      <>
        <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={
                    this.props.user
                      ? this.props.user._photo
                        ? this.props.user._photo.img
                        : this.props.photo_user
                      : this.props.photo_user
                  }
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold">
                  {this.props.user ? this.props.user.firstName : null}{' '}
                  {this.props.user ? this.props.user.lastName : null}
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </DropdownItem>
            {authService.isAdmin() ? (
              <DropdownItem to="/admin/index" tag={Link}>
                <i className="ni ni-single-02" />
                <span>Dashboard</span>
              </DropdownItem>
            ) : null}
            <DropdownItem to="/default/user-profile" tag={Link}>
              <i className="ni ni-single-02" />
              <span>My profile</span>
            </DropdownItem>
            <DropdownItem to="/default/user-profile" tag={Link}>
              <i className="ni ni-settings-gear-65" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              href="#pablo"
              onClick={() => authService.logout(this.props)}
            >
              <i className="ni ni-user-run" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    )
  }
}

export default MyProfile
