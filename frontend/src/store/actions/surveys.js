import {
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  RESET_SURVEYS,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY,
  ACTIVE_SURVEY_IS_LOADING,
  NEXT_SURVEY_IS_LOADING,
  DRAFT_SURVEY_IS_LOADING
} from './types';
import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';

export const setSurveys = tribe_id => dispatch => {
  const config = getHttpConfig();
  dispatch(resetSurveys());
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/surveys`, config)
    .then(response => {
      const { active, next, draft } = response.data;
      active
        ? dispatch(setActiveSurvey(active))
        : dispatch(setAcitveSurveyIsLoading(false));
      next
        ? dispatch(setNextSurvey(next))
        : dispatch(setNextSurveyIsLoading(false));
      draft
        ? dispatch(setDraftSurvey(draft))
        : dispatch(setDraftSurveyIsLoading(false));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const resetSurveys = () => ({ type: RESET_SURVEYS });

export const setAcitveSurveyIsLoading = isLoading => ({
  type: ACTIVE_SURVEY_IS_LOADING,
  payload: isLoading
});

export const setNextSurveyIsLoading = isLoading => ({
  type: NEXT_SURVEY_IS_LOADING,
  payload: isLoading
});

export const setDraftSurveyIsLoading = isLoading => ({
  type: DRAFT_SURVEY_IS_LOADING,
  payload: isLoading
});

export const setActiveSurvey = survey_id => dispatch => {
  const config = getHttpConfig();
  dispatch(setAcitveSurveyIsLoading(true));
  return axios
    .get(`${endpoints.getSurvey}${survey_id}`, config)
    .then(response => {
      dispatch({
        type: SET_ACTIVE_SURVEY,
        payload: response.data
      });
    })
    .then(() => dispatch(setAcitveSurveyIsLoading(false)))
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setNextSurvey = survey_id => dispatch => {
  const config = getHttpConfig();
  dispatch(setNextSurveyIsLoading(true));
  return axios
    .get(`${endpoints.getSurvey}${survey_id}`, config)
    .then(response => {
      dispatch({
        type: SET_NEXT_SURVEY,
        payload: response.data
      });
    })
    .then(() => dispatch(setNextSurveyIsLoading(false)))
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setDraftSurvey = survey_id => dispatch => {
  const config = getHttpConfig();
  dispatch(setDraftSurveyIsLoading(true));
  return axios
    .get(`${endpoints.getSurvey}${survey_id}`, config)
    .then(response => {
      dispatch({
        type: SET_DRAFT_SURVEY,
        payload: response.data
      });
    })
    .then(() => dispatch(setDraftSurveyIsLoading(false)))
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

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
