import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import Axios from "axios";
import { DEFAULT_URL } from "../config";

class AuthService {
  tokenKey = "token";
  refreshTokenKey = "refresh_token";

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  invalidateUser() {
    localStorage.removeItem(this.tokenKey);
  }

  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  decode(token) {
    return jwt.decode(token);
  }

  getExpiration(token) {
    const exp = this.decode(token).exp;
    return moment.unix(exp);
  }

  getUsername() {
    const token = this.decode(this.getToken());
    return token.username;
  }

  getRoles(token) {
    let role = "";
    if (token) {
      const roles = this.decode(token).roles;
      if (roles) {
        role = roles[0];
      }
      return role;
    }
    return role;
  }

  isSearcher() {
    return "ROLE_SEARCHER";
  }

  isCustomer() {
    return "ROLE_CUSTOMER";
  }

  isAdmin() {
    return "ROLE_ADMIN";
  }

  isValid(token) {
    if (moment().isBefore(this.getExpiration(token))) return true;
    else {
      return Axios.post(`${DEFAULT_URL}api/token/refresh`, {
        refresh_token: this.getRefreshToken()
      })
        .then(res => {
          console.log("expired");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          return true;
        })
        .catch(error => {
          return false;
        });
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  }
}

export default new AuthService();
