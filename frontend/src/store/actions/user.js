import { LOGIN, LOGOUT, OPTION_SELECTED } from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { endpoints } from "../../services/http";
import { closeLoginModal } from "./general";

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
    // localStorage.removeItem("jwt");
    localStorage.setItem("jwt", jwt);
    const { user } = jwtDecode(jwt);
    dispatch(setUser(user));
    dispatch(closeLoginModal());
  });
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return {
    type: LOGOUT
  };
};

export const setMenuOption = optionName => ({
  type: OPTION_SELECTED,
  payload: optionName
});
