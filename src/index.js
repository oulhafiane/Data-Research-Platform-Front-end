import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AuthLayout from 'layouts/Auth.jsx'
import Default from 'layouts/Default'
import Landing from 'layouts/Landing'
import Admin from 'layouts/Admin'
import ScrollToTop from 'components/Scroll/ScrollUp'
import Data from 'layouts/Data'

import { Provider } from 'react-redux'
import store from './store'

import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import 'assets/css/shards-dashboards.1.1.0.css'
import 'assets/css/Dropzone.css'
import 'assets/css/custom.css'
import 'assets/scss/argon-design-system-react.scss'
import 'assets/vendor/font-awesome/css/font-awesome.min.css'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/default" render={props => <Default {...props} />} />
        <Route path="/landing" render={props => <Landing {...props} />} />
        <Route path="/data" render={props => <Data {...props} />} />
        <Route path="/admin" render={props => <Admin {...props} />} />
        <Redirect from="/" to="/landing/index" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
