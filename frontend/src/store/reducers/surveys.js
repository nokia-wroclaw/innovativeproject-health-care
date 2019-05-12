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
    case ADD_QUESTION_TO_DRAFT_SURVEY:
      draft = { ...state.draft };
      draft.questions.push({
        question: action.payload,
        order: draft.questions.length + 1
      });
      return {
        ...state,
        draft
      };

    case ADD_QUESTION_TO_NEXT_SURVEY:
      next = { ...state.next };
      next.questions.push({
        question: action.payload,
        order: next.questions.length + 1
      });
      return {
        ...state,
        next
      };

    case DELETE_QUESTION_FROM_DRAFT_SURVEY:
      draft = { ...state.draft };
      if (action.payload.id)
        draft.questions = draft.questions.filter(
          question => question.id !== action.payload.id
        );
      else if (action.payload.order)
        draft.questions = draft.questions.filter(
          question => question.order !== action.payload.order
        );
      else if (action.payload.question)
        draft.questions = draft.questions.filter(
          question => question.question !== action.payload.question
        );

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
        ).question = action.payload.question;
      else if (action.payload.order)
        draft.questions.find(
          question => question.order === action.payload.order
        ).question = action.payload.question;
      return {
        ...state,
        draft
      };

    case UPDATE_DRAFT_SURVEY:
      return {
        ...state,
        draft: action.payload
      };
    default:
      return state;
  }
}
