import {
  // SET_TEAM_MANAGERS,
  // SET_TEAM_MEMBERS,
  DELETE_TEAM,
  UPDATE_TEAM_NAME,
  ADD_MANAGER_TO_TEAM,
  DELETE_MANAGER_FROM_TEAM,
  ADD_MEMBER_TO_TEAM,
  DELETE_MEMBER_FROM_TEAM
} from "./types";
import axios from "axios";
import { endpoints, getHttpConfig } from "../../services/http";
import { openLoginModal } from "./general";

export const updateTeamName = (team, name) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(
      `${endpoints.teams}${team.id}`,
      { tribe_id: team.tribe_id, name },
      config
    )
    .then(() => {
      dispatch({
        type: UPDATE_TEAM_NAME,
        payload: { team, name }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const addManagerToTeam = (team, user) => dispatch => {
  const config = getHttpConfig();
  return axios
    .put(`${endpoints.teams}${team.id}/managers/${user.id}`, {}, config)
    .then(() => {
      dispatch({
        type: ADD_MANAGER_TO_TEAM,
        payload: { team, user }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const deleteManagerFromTeam = (team, user) => dispatch => {
  const config = getHttpConfig();
  return axios
    .delete(`${endpoints.teams}${team.id}/managers/${user.id}`, config)
    .then(() => {
      dispatch({
        type: DELETE_MANAGER_FROM_TEAM,
        payload: { team, user }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
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
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};
