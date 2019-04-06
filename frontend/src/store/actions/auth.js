import { LOGIN, LOGOUT } from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { endpoints } from "../../services/http";

export const setUser = user => ({
  type: LOGIN,
  payload: user
});

export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`)
    }
  };

  return axios.post(endpoints.login, {}, config).then(response => {
    const jwt = response.data.access_token;
    localStorage.setItem("jwt", jwt);
    const { user } = jwtDecode(jwt);
    dispatch(setUser(user));
  });
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return {
    type: LOGOUT
  };
};
