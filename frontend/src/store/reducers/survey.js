import { QUESTION_ANSWERED } from "../actions/types";

const initialState = {
  activeQuestions: [
    {
      title: "Support",
      answer: undefined,
      comment: "",
      id: 0
    },
    {
      title: "Fun",
      answer: undefined,
      comment: "",
      id: 1
    },
    {
      title: "Teamwork",
      answer: undefined,
      comment: "",
      id: 2
    },
    {
      title: "Prawns or Players",
      answer: undefined,
      comment: "",
      id: 3
    },
    {
      title: "Health of codebase",
      answer: undefined,
      comment: "",
      id: 4
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case QUESTION_ANSWERED:
      const activeQuestions = [...state.activeQuestions];
      const { questionId, answer } = action.payload;
      activeQuestions.find(
        question => question.id === questionId
      ).answer = answer;
      return {
        ...state,
        activeQuestions
      };

    default:
      return state;
  }
}
