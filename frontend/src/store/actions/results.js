import { endpoints, http } from "../../services/http";
import { handleFetchingError } from "./general";
import { SET_TEAM_ANSWERS, SET_TRIBE_HISTORY, SET_TRIBE_MATRIX } from "./types";

export const setTeamAnswers = team_id => dispatch => {
  return http
    .get(`${endpoints.results}?type=team&teamid=${team_id}`)
    .then(response => {
      dispatch({
        type: SET_TEAM_ANSWERS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setTribeMatrix = (tribe_id, period_id = null) => dispatch => {
  let period_query = period_id ? `&period=${period_id}` : "";
  return http
    .get(
      `${endpoints.results}?type=tribematrix&tribeid=${tribe_id}${period_query}`
    )
    .then(response => {
      dispatch({
        type: SET_TRIBE_MATRIX,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setTribeHistory = (tribe_id, periods_num = null) => dispatch => {
  let periods_query = periods_num ? `&periods=${periods_num}` : "";
  return http
    .get(`${endpoints.results}?type=team&teamid=${tribe_id}${periods_num}`)
    .then(response => {
      dispatch({
        type: SET_TRIBE_HISTORY,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
