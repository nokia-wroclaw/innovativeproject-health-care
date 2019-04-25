import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TRIBE_TEAMS,
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
    .catch(() => {
      dispatch(openLoginModal());
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
    .catch(() => {
      dispatch(openLoginModal());
    });
};

export const setTribeTeams = tribe_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/teams`, config)
    .then(response => {
      dispatch({
        type: SET_TRIBE_TEAMS,
        payload: {
          tribe_id,
          teams: response.data
        }
      });
    })
    .catch(() => {
      dispatch(openLoginModal());
    });
};

// export const setTeamManagers = team_id => dispatch => {
//   const config = getHttpConfig();
//   return axios
//     .get(`${endpoints.teams}${team_id}/managers`, config)
//     .then(response => {
//       dispatch({
//         type: SET_TEAM_MANAGERS,
//         payload: {
//           team_id,
//           managers: response.data
//         }
//       });
//     })
//     .catch(() => {
//       dispatch(openLoginModal());
//     });
// };

// export const setTeamMembers = team_id => dispatch => {
//   const config = getHttpConfig();
//   return axios
//     .get(`${endpoints.teams}${team_id}/teams`, config)
//     .then(response => {
//       dispatch({
//         type: SET_TEAM_MEMBERS,
//         payload: {
//           team_id,
//           members: response.data
//         }
//       });
//     })
//     .catch(() => {
//       dispatch(openLoginModal());
//     });
// };

// export const addTribe = tribe => dispatch => {
//   return axios.put(`${endpoints.putTribe}${tribe.id}`, {}, httpConfig).then(
//     dispatch({
//       type: ADD_TRIBE,
//       payload: tribe
//     })
//   );
// };

// export const deleteTribe = tribe => dispatch => {
//   return axios.delete(`${endpoints.deleteTribe}${tribe.id}`, httpConfig).then(
//     dispatch({
//       type: DELETE_TRIBE,
//       payload: tribe
//     })
//   );
// };
