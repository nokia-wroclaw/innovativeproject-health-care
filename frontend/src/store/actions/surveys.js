import {
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  RESET_SURVEYS,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY,
  SET_SURVEYS_ARE_LOADING,
  SET_DRAFT_SURVEY_PERIOD
} from './types';
import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';

export const setSurveys = tribe_id => dispatch => {
  const config = getHttpConfig();
  dispatch(setSurveysAreLoading(true));
  dispatch(resetSurveys());
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/surveys`, config)
    .then(response => {
      const { active, next, draft } = response.data;
      if (active) dispatch(setActiveSurvey(active));
      if (next) dispatch(setNextSurvey(next));
      if (draft) dispatch(setDraftSurvey(draft));

      dispatch(setSurveysAreLoading(false));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const resetSurveys = () => ({ type: RESET_SURVEYS });

export const setSurveysAreLoading = areLoading => ({
  type: SET_SURVEYS_ARE_LOADING,
  payload: areLoading
});

export const setActiveSurvey = active_survey => ({
  type: SET_ACTIVE_SURVEY,
  payload: active_survey
});

export const setNextSurvey = next_survey => ({
  type: SET_NEXT_SURVEY,
  payload: next_survey
});

export const setDraftSurvey = draft_survey => ({
  type: SET_DRAFT_SURVEY,
  payload: draft_survey
});

export const addQuestionToDraftSurvey = question_text => ({
  type: ADD_QUESTION_TO_DRAFT_SURVEY,
  payload: question_text
});

export const deleteQuestionFromDraftSurvey = question => ({
  type: DELETE_QUESTION_FROM_DRAFT_SURVEY,
  payload: question
});

export const updateQuestionInDraftSurvey = question => ({
  type: UPDATE_QUESTION_IN_DRAFT_SURVEY,
  payload: question
});

export const updateDraftSurvey = draft_survey => ({
  type: SET_DRAFT_SURVEY,
  payload: draft_survey
});

export const setDraftSurveyPeriod = draft_period => ({
  type: SET_DRAFT_SURVEY_PERIOD,
  payload: draft_period
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
      dispatch(updateDraftSurvey(response.data));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const publishDraftSurvey = survey => dispatch => {
  const config = getHttpConfig();
  return axios
    .patch(
      `${endpoints.getSurvey}${survey.id}`,
      {
        draft: false
      },
      config
    )
    .then(response => {
      dispatch(setSurveys(response.data.tribe_id));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const saveAndPublishDraftSurvey = (tribe_id, survey) => dispatch => {
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
      dispatch(updateDraftSurvey(response.data));
      dispatch(publishDraftSurvey(response.data));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
