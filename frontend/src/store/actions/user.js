import {
  SET_USER,
  LOGOUT,
  OPTION_SELECTED,
  SET_USER_TEAMS_DETAILS,
  SET_USER_MANAGING_DETAILS,
  SET_USER_TRIBES_DETAILS,
  SET_USER_EDITING_DETAILS
} from "./types";
import jwtDecode from "jwt-decode";
import { endpoints, http } from "../../services/http";
import { closeLoginModal, handleFetchingError } from "./general";
import history from "../../history";
import * as authorization from "../../services/authorization";

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const login = (username, password) => dispatch => {
  return authorization
    .login(username, password)
    .then(user => {
      dispatch(setUser(user));
      dispatch(closeLoginModal());
      if (history.location.pathname === "/") {
        const firstManuOption = authorization.getMenu(user)[0];
        history.push(firstManuOption.path);
        dispatch(setMenuOption(firstManuOption.name));
      }
    })
    .catch(error => console.log(error));
};

export const logout = () => {
  authorization.logout();
  return {
    type: LOGOUT
  };
};

export const setUserFromSessionStorage = () => dispatch => {
  const jwt = authorization.getToken();
  if (jwt) {
    const { user } = jwtDecode(jwt);
    dispatch(setUser(user));
    dispatch(updateUserData(user));
  }
};

export const updateUserData = user => dispatch => {
  return http
    .get(`${endpoints.users}/${user.id}`)
    .then(({ data }) => dispatch(setUser(data)))
    .catch(error => dispatch(handleFetchingError(error)));
};

export const setMenuOption = optionName => ({
  type: OPTION_SELECTED,
  payload: optionName
});

export const setUserTeamsDetails = user => dispatch => {
  return http
    .get(`${endpoints.users}/${user.id}/teams?role=member`)
    .then(response => {
      dispatch({
        type: SET_USER_TEAMS_DETAILS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setUserManagingDetails = user => dispatch => {
  return http
    .get(`${endpoints.users}/${user.id}/teams?role=manager`)
    .then(response => {
      dispatch({
        type: SET_USER_MANAGING_DETAILS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setUserTribesDetails = user => dispatch => {
  return http
    .get(`${endpoints.users}/${user.id}/tribes?role=member`)
    .then(response => {
      dispatch({
        type: SET_USER_TRIBES_DETAILS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setUserEditingDetails = user => dispatch => {
  return http
    .get(`${endpoints.users}/${user.id}/tribes?role=editor`)
    .then(response => {
      dispatch({
        type: SET_USER_EDITING_DETAILS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
