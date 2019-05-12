import { QUESTION_ANSWERED } from './types';

export const setAnswer = (questionId, answer) => ({
  type: QUESTION_ANSWERED,
  payload: { questionId, answer }
});
