import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "./types";
import { endpoints, http } from "../../services/http";
import { handleFetchingError } from "./general";

export const setEditors = () => dispatch => {
  return http
    .get(endpoints.editors)
    .then(response => {
      dispatch({
        type: SET_EDITORS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const addEditor = user => dispatch => {
  return http
    .put(`${endpoints.editors}/${user.id}`)
    .then(
      dispatch({
        type: ADD_EDITOR,
        payload: user
      })
    )
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};

export const deleteEditor = editor => dispatch => {
  return http
    .delete(`${endpoints.editors}/${editor.id}`)
    .then(
      dispatch({
        type: DELETE_EDITOR,
        payload: editor
      })
    )
    .catch(error => {
      dispatch(handleFetchingError(error));
    });
};
