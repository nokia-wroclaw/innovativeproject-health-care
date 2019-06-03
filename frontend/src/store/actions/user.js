import {
  SET_USER,
  LOGOUT,
  OPTION_SELECTED,
  SET_USER_TEAMS_DETAILS,
  SET_USER_MANAGING_DETAILS,
  SET_USER_TRIBES_DETAILS,
  SET_USER_EDITING_DETAILS
} from "./types";
import { endpoints, http } from "../../services/http";
import { closeLoginModal, handleFetchingError } from "./general";
import * as auth from "../../services/auth";

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const login = (username, password) => dispatch => {
  return auth
    .login(username, password)
    .then(user => {
      dispatch(setUser(user));
      dispatch(closeLoginModal());
    })
    .catch(error => {
      throw error;
    });
};

export const logout = () => {
  auth.logout();
  return {
    type: LOGOUT
  };
};

export const setUserFromSessionStorage = () => dispatch => {
  const user = auth.getUserData();
  if (user) {
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
    .get(`${endpoints.users}/${user.id}/tribes`)
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
