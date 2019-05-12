import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TEAMS_IN_TRIBE,
  ADD_TRIBE,
  DELETE_TRIBE,
  UPDATE_TRIBE_NAME,
  ADD_EDITOR_TO_TRIBE,
  DELETE_EDITOR_FROM_TRIBE,
  ADD_TEAM_TO_TRIBE
} from './types';
import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';

export const setTribes = () => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(endpoints.getTribes, config)
    .then(response => {
      dispatch({
        type: SET_TRIBES,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setTribeEditors = tribe => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe.id}/editors`, config)
    .then(response => {
      dispatch({
        type: SET_TRIBE_EDITORS,
        payload: {
          tribe,
          editors: response.data
        }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setTeamsInTribe = tribe => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe.id}/teams`, config)
    .then(response => {
      dispatch({
        type: SET_TEAMS_IN_TRIBE,
        payload: {
          tribe,
          teams: response.data
        }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const addTribe = name => dispatch => {
  const config = getHttpConfig();
  return axios
    .post(
      `${endpoints.postTribe}`,
      {
        name
      },
      config
    )
    .then(response => {
      dispatch({
        type: ADD_TRIBE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteTribe = tribe => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.deleteTribe}${tribe.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_TRIBE,
        payload: tribe
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const updateTribeName = (tribe, newName) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.putTribe}${tribe.id}`, { name: newName }, config)
    .then(() => {
      dispatch({
        type: UPDATE_TRIBE_NAME,
        payload: { tribe, name: newName }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const addEditorToTribe = (tribe, editor) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.getTribe}${tribe.id}/editors/${editor.id}`, {}, config)
    .then(() => {
      dispatch({
        type: ADD_EDITOR_TO_TRIBE,
        payload: { tribe, editor }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteEditorFromTribe = (tribe, editor) => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.deleteTribe}${tribe.id}/editors/${editor.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_EDITOR_FROM_TRIBE,
        payload: { tribe, editor }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const addTeamToTribe = (tribe, team_name) => dispatch => {
  const config = getHttpConfig();
  return axios
    .post(`${endpoints.getTribe}${tribe.id}/teams`, { name: team_name }, config)
    .then(response => {
      dispatch({
        type: ADD_TEAM_TO_TRIBE,
        payload: { tribe, team: response.data }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
