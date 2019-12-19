import { GET_USER } from "./types";
import { DEFAULT_URL } from "config";
import Axios from "axios";

export const getUser = () => async dispatch => {
  const token = localStorage.getItem("token");
  let res = null;
  if (token !== null) {
    const config = {
      headers: { Authorization: "bearer " + token }
    };
    try {
      res = await Axios.get(`${DEFAULT_URL}api/current/infos`, config);
    } catch (error) {}
  }
  dispatch({
    type: GET_USER,
    payload: res ? res.data : null
  });
};
