import {
  SET_CURRENT_SURVEY,
  SET_CURRENT_SURVEY_IS_LOADING,
  SET_QUESTION_ANSWER,
  SET_QUESTION_COMMENT
} from '../actions/types';

const initialState = {};
let questions;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_SURVEY:
      let survey = action.payload;
      if (survey.questions) {
        survey.questions = survey.questions.sort(
          (q1, q2) => q1.order - q2.order
        );
      }
      return survey;

    case SET_CURRENT_SURVEY_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case SET_QUESTION_ANSWER:
      questions = [...state.questions];
      const { answer } = action.payload;
      questions.find(
        question => question.id === action.payload.questionId
      ).answer = answer;
      return {
        ...state,
        questions
      };

    case SET_QUESTION_COMMENT:
      questions = [...state.questions];
      const { comment } = action.payload;
      questions.find(
        question => question.id === action.payload.questionId
      ).comment = comment;
      return {
        ...state,
        questions
      };

    default:
      return state;
  }
}
