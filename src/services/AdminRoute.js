import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from './auth-service'

function AdminRoute(props) {
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={props =>
        authService.isAuthenticatedSync() ? (
          authService.isAdmin() ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect to={{ pathname: '/default/posts' }} />
          )
        ) : (
          <Redirect
            to={{ pathname: '/auth/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default AdminRoute
