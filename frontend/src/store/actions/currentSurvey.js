import {
  SET_CURRENT_SURVEY,
  SET_QUESTION_ANSWER,
  SET_QUESTION_COMMENT
} from './types';
import axios from 'axios';
import { endpoints, getHttpConfig } from '../../services/http';
import { handleFetchingError } from './general';

export const setCurrentSurvey = tribe_id => dispatch => {
  const config = getHttpConfig();
  return axios
    .get(`${endpoints.getTribe}${tribe_id}/surveys?type=active`, config)
    .then(response => {
      dispatch({
        type: SET_CURRENT_SURVEY,
        payload: response.data.active
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const setAnswer = (questionId, answer) => ({
  type: SET_QUESTION_ANSWER,
  payload: { questionId, answer }
});

export const setComment = (questionId, comment) => ({
  type: SET_QUESTION_COMMENT,
  payload: { questionId, comment }
});

export const sendFilledSurvey = (team_id, survey) => dispatch => {
  const config = getHttpConfig();
  const answers = survey.questions.map(question => ({
    question_id: question.id,
    answer: question.answer,
    comment: question.comment
  }));

  return axios
    .post(
      `${endpoints.getSurvey}${survey.id}/answers`,
      {
        team_id,
        answers
      },
      config
    )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
