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
    console.log("hadi : " + localStorage.getItem(this.refreshTokenKey));
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

  async isValid(token) {
    console.log("dkhalna");
    if (moment().isBefore(this.getExpiration(token))) return true;
    else {
      return await Axios.post(`${DEFAULT_URL}api/token/refresh`, {
        refresh_token: this.getRefreshToken()
      })
        .then(res => {
          console.log("refresh");
          console.log(res.data.refresh_token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          console.log(localStorage.getItem("refresh_token"));
          return true;
        })
        .catch(error => {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          return false;
        });
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  }

  isSearcher() {
    let found = false;
    if (this.isAuthenticated()) {
      const roles = this.decode(this.getToken()).roles;
      roles.forEach(role => {
        console.log(role);
        if (role == "ROLE_SEARCHER") {
          found = true;
        }
      });
    }
    console.log("IsSearcher : " + found);
    return found;
  }

  isCustomer() {
    let found = false;
    if (this.isAuthenticated()) {
      const roles = this.decode(this.getToken()).roles;
      roles.forEach(role => {
        if (role == "ROLE_CUSTOMER") {
          found = true;
        }
      });
    }
    return found;
  }

  isAdmin() {
    let found = false;
    if (this.isAuthenticated()) {
      const roles = this.decode(this.getToken()).roles;
      roles.forEach(role => {
        if (role == "ROLE_ADMIN") {
          found = true;
        }
      });
    }
    return found;
  }
}

export default new AuthService();
