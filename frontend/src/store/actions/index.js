import { LOGIN } from "./types";

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
