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
import React from "react";
import { withRouter } from 'react-router';
import ClickOutside from "../Other/ClickOutSide"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

class DataSidebar extends React.Component {
  state = {
    expanded: false
  }
  render() {
    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({ expanded: false });
        }}
      >
        <SideNav
          className="navbar-vertical fixed-left navbar-light bg-default"
          expanded={this.state.expanded}
          onToggle={(expanded) => {
            this.setState({ expanded });
          }}
          onSelect={(selected) => {
            console.log(selected)
            const to = '/' + selected;
            if (location.pathname !== to) {
              this.props.history.push(to);
            }
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Home
            </NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Charts
            </NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>
                  Line Chart
                </NavText>
              </NavItem>
              <NavItem eventKey="admin/index">
                <NavText>
                  Bar Chart
                </NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    );
  }
}

export default withRouter(DataSidebar);
