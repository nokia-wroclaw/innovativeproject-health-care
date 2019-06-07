import {
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  RESET_SURVEYS,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY,
  SET_DRAFT_SURVEY_PERIOD,
  SET_SURVEYS_ARE_LOADING,
  DELETE_SURVEY
} from "../actions/types";

const initialState = {
  areLoading: true,
  active: {},
  next: {},
  draft: {
    questions: [],
    period_len: 1
  }
};

let draft, survey;

const sortQuestions = questions => {
  if (!Array.isArray(questions)) return;
  return questions.sort((q1, q2) => q1.order - q2.order);
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SURVEYS_ARE_LOADING:
      return {
        ...state,
        areLoading: action.payload
      };

    case SET_ACTIVE_SURVEY:
      survey = action.payload;
      survey.questions = sortQuestions(survey.questions);
      return {
        ...state,
        active: survey
      };

    case SET_NEXT_SURVEY:
      survey = action.payload;
      survey.questions = sortQuestions(survey.questions);
      return {
        ...state,
        next: survey
      };

    case SET_DRAFT_SURVEY:
      survey = action.payload;
      survey.questions = sortQuestions(survey.questions);
      return {
        ...state,
        draft: survey
      };

    case SET_DRAFT_SURVEY_PERIOD:
      return {
        ...state,
        draft: { ...state.draft, period_len: action.payload }
      };

    case RESET_SURVEYS:
      return {
        ...state,
        active: initialState.active,
        next: initialState.next,
        draft: initialState.draft
      };

    case DELETE_SURVEY:
      return {
        ...state,
        next: initialState.next
      };

    case ADD_QUESTION_TO_DRAFT_SURVEY:
      draft = { ...state.draft };
      draft.questions.push({
        value: action.payload,
        order: draft.questions.length + 1
      });
      return {
        ...state,
        draft
      };

    case DELETE_QUESTION_FROM_DRAFT_SURVEY:
      draft = { ...state.draft };

      if (action.payload.id) {
        draft.questions = draft.questions.filter(
          question => question.id !== action.payload.id
        );
      } else if (action.payload.order) {
        draft.questions = draft.questions.filter(
          question => question.order !== action.payload.order
        );
      } else if (action.payload.question) {
        draft.questions = draft.questions.filter(
          question => question.value !== action.payload.value
        );
      }

      draft.questions = draft.questions.map((question, i) => ({
        ...question,
        order: i + 1
      }));

      return {
        ...state,
        draft
      };

    case UPDATE_QUESTION_IN_DRAFT_SURVEY:
      draft = { ...state.draft };

      if (action.payload.id)
        draft.questions.find(
          question => question.id === action.payload.id
        ).value = action.payload.value;
      else if (action.payload.order)
        draft.questions.find(
          question => question.order === action.payload.order
        ).value = action.payload.value;
      return {
        ...state,
        draft
      };

    default:
      return state;
  }
}
