import {
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  RESET_SURVEYS,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY,
  SET_SURVEYS_ARE_LOADING,
  SET_DRAFT_SURVEY_PERIOD, DELETE_SURVEY
} from "./types";
import { endpoints, http } from "../../services/http";
import { handleFetchingError } from "./general";

export const setSurveys = tribe_id => dispatch => {
  dispatch(setSurveysAreLoading(true));
  dispatch(resetSurveys());
  return http
    .get(`${endpoints.tribes}/${tribe_id}/surveys`)
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
  return http
    .post(`${endpoints.tribes}/${tribe_id}/surveys`, {
      ...survey
    })
    .then(response => {
      dispatch(updateDraftSurvey(response.data));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const publishDraftSurvey = survey => dispatch => {
  return http
    .patch(`${endpoints.surveys}/${survey.id}`, {
      draft: false
    })
    .then(response => {
      dispatch(setSurveys(response.data.tribe_id));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const saveAndPublishDraftSurvey = (tribe_id, survey) => dispatch => {
  return http
    .post(`${endpoints.tribes}/${tribe_id}/surveys`, {
      ...survey
    })
    .then(response => {
      dispatch(updateDraftSurvey(response.data));
      dispatch(publishDraftSurvey(response.data));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteSurvey = (survey) => dispatch => {
  return http
    .delete(`${endpoints.surveys}/${survey.id}`)
    .then(() => {
      dispatch({
        type: DELETE_SURVEY,
        payload: { survey }
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};