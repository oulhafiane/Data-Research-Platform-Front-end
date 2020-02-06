import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'
import Axios from 'axios'
import { DEFAULT_URL } from '../config'

class AuthService {
  tokenKey = 'token'
  refreshTokenKey = 'refresh_token'

  getToken() {
    return localStorage.getItem(this.tokenKey)
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey)
  }

  invalidateUser() {
    localStorage.removeItem(this.tokenKey)
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token)
  }

  decode(token) {
    return jwt.decode(token)
  }

  getExpiration(token) {
    const tokenDecoded = this.decode(token)
    if (null === tokenDecoded) return null
    const exp = tokenDecoded.exp
    return moment.unix(exp)
  }

  getUsername() {
    const token = this.decode(this.getToken())
    return token.username
  }

  async isValid(token) {
    const exp = this.getExpiration(token)
    if (null === exp) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      return false
    }
    if (moment().isBefore(exp)) return true
    else {
      try {
        const res = await Axios.post(`${DEFAULT_URL}api/token/refresh`, {
          refresh_token: this.getRefreshToken(),
        })
        if (res.data) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          return true
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('refresh_token')
          return false
        }
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        return false
      }
    }
  }

  successAuth = (res, props) => {
    if (res.data.token !== undefined) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('refresh_token', res.data.refresh_token)
      props.history.push(
        props.location
          ? props.location.state
            ? props.location.state.from
              ? props.location.state.from.pathname
                ? props.location.state.from.pathname
                : '/default/posts'
              : '/default/posts'
            : '/default/posts'
          : '/default/posts',
      )
    }
  }

  logout = props => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    if (props !== undefined && props.history) props.history.push('/')
  }

  async isAuthenticated() {
    const token = this.getToken()
    return token && (await this.isValid(token)) ? true : false
  }

  isAuthenticatedSync() {
    const token = this.getToken()
    return token && this.isValid(token) ? true : false
  }

  async isSearcher() {
    let found = false
    if (await this.isAuthenticated()) {
      const tokenDecoded = this.decode(this.getToken())
      if (null === tokenDecoded) return false
      const roles = tokenDecoded.roles
      roles.forEach(role => {
        if (role === 'ROLE_SEARCHER') {
          found = true
        }
      })
    }
    return found
  }

  isCustomer() {
    let found = false
    if (this.isAuthenticated()) {
      const tokenDecoded = this.decode(this.getToken())
      if (null === tokenDecoded) return false
      const roles = tokenDecoded.roles
      roles.forEach(role => {
        if (role === 'ROLE_CUSTOMER') {
          found = true
        }
      })
    }
    return found
  }

  isAdmin() {
    let found = false
    if (this.isAuthenticated()) {
      const tokenDecoded = this.decode(this.getToken())
      if (null === tokenDecoded) return false
      const roles = tokenDecoded.roles
      roles.forEach(role => {
        if (role === 'ROLE_ADMIN') {
          found = true
        }
      })
    }
    return found
  }
}

export default new AuthService()
