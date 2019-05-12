import {
  SET_SURVEYS,
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  ADD_QUESTION_TO_NEXT_SURVEY,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_NEXT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_NEXT_SURVEY,
  UPDATE_DRAFT_SURVEY
} from './types';
import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';

export const setSurveys = tribe_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/surveys`, config)
    .then(response => {
      console.log(response);
      const { active, next, draft } = response.data;
      if (active) dispatch(setActiveSurvey(active));
      if (next) dispatch(setNextSurvey(next));
      if (draft) dispatch(setDraftSurvey(draft));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setActiveSurvey = survey_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getSurvey}${survey_id}`, config)
    .then(response => {
      dispatch({
        type: SET_ACTIVE_SURVEY,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setNextSurvey = survey_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getSurvey}${survey_id}`, config)
    .then(response => {
      dispatch({
        type: SET_NEXT_SURVEY,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setDraftSurvey = survey_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getSurvey}${survey_id}`, config)
    .then(response => {
      dispatch({
        type: SET_DRAFT_SURVEY,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const addQuestionToDraftSurvey = question_text => ({
  type: ADD_QUESTION_TO_DRAFT_SURVEY,
  payload: question_text
});

export const addQuestionToNextSurvey = question_text => ({
  type: ADD_QUESTION_TO_NEXT_SURVEY,
  payload: question_text
});

export const deleteQuestionFromDraftSurvey = question => ({
  type: DELETE_QUESTION_FROM_DRAFT_SURVEY,
  payload: question
});

export const deleteQuestionFromNexttSurvey = question => ({
  type: DELETE_QUESTION_FROM_NEXT_SURVEY,
  payload: question
});

export const updateQuestionInDraftSurvey = question => ({
  type: UPDATE_QUESTION_IN_DRAFT_SURVEY,
  payload: question
});

export const updateQuestionInNextSurvey = question => ({
  type: UPDATE_QUESTION_IN_NEXT_SURVEY,
  payload: question
});

export const updateDraftSurvey = draft_survey => ({
  type: UPDATE_DRAFT_SURVEY,
  payload: draft_survey
});

export const saveDraftSurvey = (tribe_id, survey) => dispatch => {
  const config = getHttpConfig();
  return axios
    .post(
      `${endpoints.putTribe}${tribe_id}/surveys`,
      {
        ...survey
      },
      config
    )
    .then(response => {
      console.log(response);
      dispatch(updateDraftSurvey(response.data));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
