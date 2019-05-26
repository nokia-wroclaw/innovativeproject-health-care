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
import { endpoints, http } from "../../services/http";
import { handleFetchingError } from "./general";

export const setTeamManagers = team => dispatch => {
  return http
    .get(`${endpoints.teams}${team.id}/managers`)
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
  return http
    .get(`${endpoints.teams}${team.id}/users`)
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
  return http
    .put(`${endpoints.teams}${team.id}`, {
      tribe_id: team.tribe_id,
      name: newName
    })
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
  return http
    .delete(`${endpoints.teams}${team.id}`)
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
  return http
    .put(`${endpoints.teams}${team.id}/managers/${manager.id}`, {})
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
  return http
    .delete(`${endpoints.teams}${team.id}/managers/${manager.id}`)
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
  return http
    .put(`${endpoints.teams}${team.id}/users/${user.id}`, {})
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
  return http
    .delete(`${endpoints.teams}${team.id}/users/${user.id}`)
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
