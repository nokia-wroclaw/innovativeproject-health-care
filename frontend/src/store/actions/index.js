import { OPTION_SELECTED, QUESTION_ANSWERED } from "./types";

export const setMenuOption = optionName => ({
  type: OPTION_SELECTED,
  payload: optionName
});

export const setAnswer = (questionId, answer) => ({
  type: QUESTION_ANSWERED,
  payload: { questionId, answer }
});
