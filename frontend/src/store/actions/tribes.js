import { SET_TRIBES, ADD_TRIBE, DELETE_TRIBE } from "./types";
import axios from "axios";
import { endpoints, getHttpConfig } from "../../services/http";
import { openLoginModal } from "./general";

// export const setTribes = () => dispatch => {
//   const config = getHttpConfig();
//   return axios
//     .get(`${endpoints.getTribe}1`, config)
//     .then(response => {
//       console.log(response);
//     })
//     .catch(() => {
//       dispatch(openLoginModal());
//     });
// };
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
