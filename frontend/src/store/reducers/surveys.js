import {
  SET_ACTIVE_SURVEY,
  SET_NEXT_SURVEY,
  SET_DRAFT_SURVEY,
  RESET_ACTIVE_SURVEY,
  RESET_NEXT_SURVEY,
  RESET_DRAFT_SURVEY,
  ADD_QUESTION_TO_DRAFT_SURVEY,
  DELETE_QUESTION_FROM_DRAFT_SURVEY,
  UPDATE_QUESTION_IN_DRAFT_SURVEY
} from '../actions/types';

const initialState = {
  active: { questions: [] },
  next: { questions: [], date: '' },
  draft: {
    questions: [],
    period_len: 1
  }
};

let draft, next;

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ACTIVE_SURVEY:
      return {
        ...state,
        active: initialState.active
      };
    case RESET_NEXT_SURVEY:
      return {
        ...state,
        next: initialState.next
      };
    case RESET_DRAFT_SURVEY:
      return {
        ...state,
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

    default:
      return state;
  }
}
