import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TEAMS_IN_TRIBE,
  SET_TEAM_MANAGERS,
  SET_TEAM_MEMBERS,
  ADD_TRIBE,
  DELETE_TRIBE
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

export const setTribeEditors = tribe_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/editors`, config)
    .then(response => {
      dispatch({
        type: SET_TRIBE_EDITORS,
        payload: {
          tribe_id,
          editors: response.data
        }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const setTeamsInTribe = tribe_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/teams`, config)
    .then(response => {
      dispatch({
        type: SET_TEAMS_IN_TRIBE,
        payload: {
          tribe_id,
          teams: response.data
        }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const setTeamManagers = (tribe_id, team_id) => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.teams}${team_id}/managers`, config)
    .then(response => {
      dispatch({
        type: SET_TEAM_MANAGERS,
        payload: {
          tribe_id,
          team_id,
          managers: response.data
        }
      });
    })
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

export const setTeamMembers = (tribe_id, team_id) => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.teams}${team_id}/users`, config)
    .then(response => {
      console.log(response);
      dispatch({
        type: SET_TEAM_MEMBERS,
        payload: {
          tribe_id,
          team_id,
          members: response.data
        }
      });
    })
    .catch(error => {
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
    .then(
      response => console.log(response)
      // dispatch({
      //   type: ADD_TRIBE
      // })
    )
    .catch(error => {
      if (error.response.status === 401) dispatch(openLoginModal());
    });
};

// export const deleteTribe = tribe => dispatch => {
//   return axios.delete(`${endpoints.deleteTribe}${tribe.id}`, httpConfig).then(
//     dispatch({
//       type: DELETE_TRIBE,
//       payload: tribe
//     })
//   );
// };
