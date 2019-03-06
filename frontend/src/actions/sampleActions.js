import { SAMPLE_TYPE } from "./types";

export const sampleFetch = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: SAMPLE_TYPE,
        payload: data
      })
    );
};
