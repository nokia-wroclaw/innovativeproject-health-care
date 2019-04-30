import { SET_USER, LOGOUT, OPTION_SELECTED } from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { endpoints } from "../../services/http";
import { closeLoginModal } from "./general";

export const setUser = user => ({
  type: SET_USER,
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
    localStorage.setItem("token", jwt);
    const { user } = jwtDecode(jwt);
    dispatch(setUser(user));
    dispatch(closeLoginModal());
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT
  };
};

export const setMenuOption = optionName => ({
  type: OPTION_SELECTED,
  payload: optionName
});
