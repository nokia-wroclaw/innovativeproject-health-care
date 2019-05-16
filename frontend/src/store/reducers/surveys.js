import {
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  RESET_SURVEYS,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY,
  SET_DRAFT_SURVEY_PERIOD,
  ACTIVE_SURVEY_IS_LOADING,
  NEXT_SURVEY_IS_LOADING,
  DRAFT_SURVEY_IS_LOADING
} from '../actions/types';

const initialState = {
  active: { isLoading: true },
  next: { isLoading: true },
  draft: {
    isLoading: true,
    questions: [],
    period_len: 1
  }
};

let draft;

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIVE_SURVEY_IS_LOADING:
      return {
        ...state,
        active: { ...state.active, isLoading: action.payload }
      };
    case NEXT_SURVEY_IS_LOADING:
      return {
        ...state,
        next: { ...state.next, isLoading: action.payload }
      };
    case DRAFT_SURVEY_IS_LOADING:
      return {
        ...state,
        draft: { ...state.draft, isLoading: action.payload }
      };

    case RESET_SURVEYS:
      return {
        ...state,
        active: initialState.active,
        next: initialState.next,
        draft: initialState.draft
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

    case SET_ACTIVE_SURVEY:
      return {
        ...state,
        active: action.payload
      };

    case SET_NEXT_SURVEY:
      return {
        ...state,
        next: action.payload
      };

    case SET_DRAFT_SURVEY:
      return {
        ...state,
        draft: action.payload
      };

    case SET_DRAFT_SURVEY_PERIOD:
      return {
        ...state,
        draft: { ...state.draft, period_len: action.payload }
      };

    default:
      return state;
  }
}
