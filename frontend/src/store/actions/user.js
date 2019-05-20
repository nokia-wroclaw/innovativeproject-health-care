import {
  SET_USER,
  LOGOUT,
  OPTION_SELECTED,
  SET_USER_TEAMS_DETAILS,
  SET_USER_MANAGING_DETAILS,
  SET_USER_TRIBES_DETAILS,
  SET_USER_EDITING_DETAILS
} from './types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { endpoints, getHttpConfig } from '../../services/http';
import { closeLoginModal, handleFetchingError } from './general';
import history from '../../history';
import authorization from '../../services/authorization';

export const setUser = user => ({
  type: SET_USER,
  payload: user
});

export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
  };

  return axios
    .post(endpoints.login, {}, config)
    .then(response => {
      const jwt = response.data.access_token;
      localStorage.setItem('token', jwt);
      const { user } = jwtDecode(jwt);
      dispatch(setUser(user));
      dispatch(closeLoginModal());
      if (history.location.pathname === '/') {
        const firstManuOption = authorization.getMenu(user)[0];
        history.push(firstManuOption.path);
        dispatch(setMenuOption(firstManuOption.name));
      }
    })
    .catch(error => console.log(error));
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT
  };
};

export const setUserFromLocalStorage = () => dispatch => {
  const jwt = localStorage.getItem('token');
  if (jwt) {
    const { user } = jwtDecode(jwt);
    dispatch(setUser(user));
    const config = getHttpConfig();
    return axios
      .get(`${endpoints.getUserData}${user.id}`, config)
      .then(({ data }) => dispatch(setUser(data)))
      .catch(error => dispatch(handleFetchingError(error)));
  }
};

export const setMenuOption = optionName => ({
  type: OPTION_SELECTED,
  payload: optionName
});

export const setUserTeamsDetails = user => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getUserData}${user.id}/teams?role=member`, config)
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
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getUserData}${user.id}/teams?role=manager`, config)
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
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getUserData}${user.id}/tribes?role=member`, config)
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
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getUserData}${user.id}/tribes?role=editor`, config)
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
