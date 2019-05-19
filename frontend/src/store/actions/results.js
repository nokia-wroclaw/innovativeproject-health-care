import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';
import {SET_TEAM_ANSWERS, SET_TRIBE_HISTORY, SET_TRIBE_MATRIX} from "./types";

export const setTeamAnswers = team_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getResults}?type=team&teamid=${team_id}`, config)
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

export const setTribeMatrix = (tribe_id, period_id=null) => dispatch => {
  const config = getHttpConfig();
  let period_query = (period_id ? `&period=${period_id}` : '');
  return axios
    .get(`${endpoints.getResults}?type=tribematrix&tribeid=${tribe_id}${period_query}`, config)
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

export const setTribeHistory = (tribe_id, periods_num=null) => dispatch => {
  const config = getHttpConfig();
  let periods_query = (periods_num ? `&periods=${periods_num}` : '');
  return axios
    .get(`${endpoints.getResults}?type=team&teamid=${tribe_id}${periods_num}`, config)
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
