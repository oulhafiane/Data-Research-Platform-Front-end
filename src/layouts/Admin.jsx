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
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// reactstrap components
import { Container } from 'reactstrap'
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.jsx'
import AdminFooter from 'components/Footers/AdminFooter.jsx'
import AdminSidebar from 'components/Sidebar/AdminSidebar.jsx'
import { connect } from 'react-redux'
import { getUser } from 'actions/userAction'
import authService from '../services/auth-service'

import routes from 'routes.js'

class Admin extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
  }
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    this.refs.mainContent.scrollTop = 0
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path,
        ) !== -1
      ) {
        return routes[i].name
      }
    }
    return 'Brand'
  }
  render() {
    return (
      <>
        {authService.isAuthenticatedSync() ? (
          authService.isAdmin() ? (
            <>
              <AdminSidebar
                {...this.props}
                routes={routes}
                logo={{
                  innerLink: '/admin/index',
                  imgSrc: require('assets/img/brand/impactree.png'),
                  imgAlt: '...',
                }}
              />
              <div
                className="main-content"
                ref="mainContent"
                style={{ backgroundColor: '#f4f5f7' }}
              >
                <AdminNavbar
                  {...this.props}
                  brandText={this.getBrandText(this.props.location.pathname)}
                />
                <Switch>{this.getRoutes(routes)}</Switch>
                <Container fluid style={{ backgroundColor: '#f4f5f7' }}>
                  <AdminFooter />
                </Container>
              </div>
            </>
          ) : (
            <Redirect to={{ pathname: '/default/posts' }} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: this.props.location },
            }}
          />
        )}
      </>
    )
  }
}

const mapStateProps = state => ({
  photo_user: state.user.photo_user,
  user: state.user.user,
})

export default connect(mapStateProps, { getUser })(Admin)
