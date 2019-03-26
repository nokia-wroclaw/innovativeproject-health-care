import { LOGIN, LOGOUT, QUESTION_ANSWERED } from "./types";

export const setUser = user => ({
  type: LOGIN,
  payload: user
});

export const logoutUser = () => ({
  type: LOGOUT
});

export const setAnswer = (questionId, answer) => ({
  type: QUESTION_ANSWERED,
  payload: { questionId, answer }
});
