import {
  SET_CURRENT_SURVEY,
  SET_CURRENT_SURVEY_IS_LOADING,
  SET_CURRENT_SURVEY_TEAM_ID,
  SET_QUESTION_ANSWER,
  SET_QUESTION_COMMENT
} from './types';
import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';

export const setCurrentSurvey = tribe_id => dispatch => {
  dispatch(setCurrentSurveyIsLoading(true));
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/surveys?type=active`, config)
    .then(response => {
      const survey = response.data.active || {};
      dispatch({
        type: SET_CURRENT_SURVEY,
        payload: survey
      });
      dispatch(setCurrentSurveyIsLoading(false));
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setCurrentSurveyTeamId = team_id => ({
  type: SET_CURRENT_SURVEY_TEAM_ID,
  payload: team_id
});

export const setCurrentSurveyIsLoading = isLoading => ({
  type: SET_CURRENT_SURVEY_IS_LOADING,
  payload: isLoading
});

export const setAnswer = (questionId, answer) => ({
  type: SET_QUESTION_ANSWER,
  payload: { questionId, answer }
});

export const setComment = (questionId, comment) => ({
  type: SET_QUESTION_COMMENT,
  payload: { questionId, comment }
});

export const sendFilledSurvey = survey => dispatch => {
  const config = getHttpConfig();
  const answers = survey.questions.map(question => ({
    question_id: question.id,
    answer: question.answer,
    comment: question.comment || ''
  }));
  const { team_id } = survey;

  const body = {
    team_id,
    answers
  };

  return axios
    .post(`${endpoints.getSurvey}${survey.id}/answers`, body, config)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
