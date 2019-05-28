import { endpoints, http } from "../../services/http";
import { handleFetchingError } from "./general";
import {
  SET_TEAM_ANSWERS,
  SET_TRIBE_HISTORY,
  SET_TRIBE_MATRIX,
  RESET_TRIBE_MATRIX,
  SET_TRIBE_PERIODS
} from "./types";

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
  dispatch({ type: RESET_TRIBE_MATRIX });
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

export const setTribeHistory = (tribe_id, periods_num) => dispatch => {
  return http
    .get(`${endpoints.results}?type=tribehistory&tribeid=${tribe_id}&periods=${periods_num}`)
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

export const setTribePeriods = tribe_id => dispatch => {
  return http
    .get(`${endpoints.tribes}/${tribe_id}/periods`)
    .then(response => {
      dispatch({
        type: SET_TRIBE_PERIODS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
