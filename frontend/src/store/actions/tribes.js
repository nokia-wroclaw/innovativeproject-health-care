import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TEAMS_IN_TRIBE,
  SET_TEAM_MANAGERS,
  SET_TEAM_MEMBERS,
  ADD_TRIBE,
  DELETE_TRIBE,
  UPDATE_TRIBE_NAME,
  ADD_EDITOR_TO_TRIBE,
  DELETE_EDITOR_FROM_TRIBE,
  ADD_TEAM_TO_TRIBE,
  DELETE_TEAM
} from "./types";
import axios from "axios";
import { endpoints, getHttpConfig } from "../../services/http";
import { openLoginModal } from "./general";

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
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const setTeamManagers = team => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.teams}${team.id}/managers`, config)
    .then(response => {
      dispatch({
        type: SET_TEAM_MANAGERS,
        payload: {
          team,
          managers: response.data
        }
      });
    })
    .catch(error => {
      console.log(error);
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const setTeamMembers = team => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.teams}${team.id}/users`, config)
    .then(response => {
      dispatch({
        type: SET_TEAM_MEMBERS,
        payload: {
          team,
          members: response.data
        }
      });
    })
    .catch(error => {
      console.log(error);
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const deleteTribe = tribe => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.deleteTribe}${tribe.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_TRIBE,
        payload: tribe.id
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const updateTribeName = (tribe, name) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.putTribe}${tribe.id}`, { name }, config)
    .then(() => {
      dispatch({
        type: UPDATE_TRIBE_NAME,
        payload: { tribe, name }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const addEditorToTribe = (tribe, user) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.getTribe}${tribe.id}/editors/${user.id}`, {}, config)
    .then(() => {
      dispatch({
        type: ADD_EDITOR_TO_TRIBE,
        payload: { tribe, user }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const deleteEditorFromTribe = (tribe, user) => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.deleteTribe}${tribe.id}/editors/${user.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_EDITOR_FROM_TRIBE,
        payload: { tribe, user }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const deleteTeamFromTribe = team => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.teams}${team.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_TEAM,
        payload: { team }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};
