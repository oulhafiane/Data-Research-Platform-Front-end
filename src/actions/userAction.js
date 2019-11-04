import { GET_USER } from "./types";
import { DEFAULT_URL } from "config";
import Axios from "axios";

export const getUser = () => async dispatch => {
  const token = localStorage.getItem("token");
  let res = null;
  if (token !== undefined) {
    const config = {
      headers: { Authorization: "bearer " + token }
    };
    res = await Axios.get(`${DEFAULT_URL}api/current/infos`, config);
  }
  dispatch({
    type: GET_USER,
    payload: res ? res.data : null
  });
};
