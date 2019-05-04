import {
  SET_TEAM_MANAGERS,
  SET_TEAM_MEMBERS,
  DELETE_TEAM,
  UPDATE_TEAM_NAME,
  ADD_MANAGER_TO_TEAM,
  DELETE_MANAGER_FROM_TEAM,
  ADD_MEMBER_TO_TEAM,
  DELETE_MEMBER_FROM_TEAM
} from "./types";
import axios from "axios";
import { endpoints, getHttpConfig } from "../../services/http";
import { handleFetchingError } from "./general";

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
      dispatch(handleFetchingError(error));
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
      dispatch(handleFetchingError(error));
    });
};

export const updateTeamName = (team, newName) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(
      `${endpoints.teams}${team.id}`,
      { tribe_id: team.tribe_id, name: newName },
      config
    )
    .then(() => {
      dispatch({
        type: UPDATE_TEAM_NAME,
        payload: { team, name: newName }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteTeam = team => dispatch => {
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
      dispatch(handleFetchingError(error));
    });
};

export const addManagerToTeam = (team, manager) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.teams}${team.id}/managers/${manager.id}`, {}, config)
    .then(() => {
      dispatch({
        type: ADD_MANAGER_TO_TEAM,
        payload: { team, user: manager }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteManagerFromTeam = (team, manager) => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.teams}${team.id}/managers/${manager.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_MANAGER_FROM_TEAM,
        payload: { team, user: manager }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const addMemberToTeam = (team, user) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.teams}${team.id}/users/${user.id}`, {}, config)
    .then(() => {
      dispatch({
        type: ADD_MEMBER_TO_TEAM,
        payload: { team, user }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteMemberFromTeam = (team, user) => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.teams}${team.id}/users/${user.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_MEMBER_FROM_TEAM,
        payload: { team, user }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
