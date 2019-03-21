import { LOGIN, QUESTION_ANSWERED } from "./types";

export const onLogin = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: LOGIN,
        payload: data
      })
    );
};

export const setAnswer = (questionId, answer) => ({
  type: QUESTION_ANSWERED,
  payload: { questionId, answer }
});
