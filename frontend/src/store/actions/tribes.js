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
} from "./types";
import { endpoints, http } from "../../services/http";
import { handleFetchingError } from "./general";

export const setTribes = () => dispatch => {
  return http
    .get(endpoints.getTribes)
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
  return http
    .get(`${endpoints.getTribe}${tribe.id}/editors`)
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
  return http
    .get(`${endpoints.getTribe}${tribe.id}/teams`)
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
  return http
    .post(`${endpoints.postTribe}`, {
      name
    })
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
  return http
    .delete(`${endpoints.deleteTribe}${tribe.id}`)
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
  return http
    .put(`${endpoints.putTribe}${tribe.id}`, { name: newName })
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
  return http
    .put(`${endpoints.getTribe}${tribe.id}/editors/${editor.id}`, {})
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
  return http
    .delete(`${endpoints.deleteTribe}${tribe.id}/editors/${editor.id}`)
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
  return http
    .post(`${endpoints.getTribe}${tribe.id}/teams`, { name: team_name })
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
