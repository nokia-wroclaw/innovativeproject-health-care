import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "./types";
import axios from "axios";
import { endpoints, getHttpConfig } from "../../services/http";
import { handleFetchingError } from "./general";

export const setEditors = () => dispatch => {
  return axios
    .get(endpoints.getEditors, getHttpConfig())
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
  return axios
    .put(`${endpoints.putEditor}${user.id}`, {}, getHttpConfig())
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
  return axios
    .delete(`${endpoints.deleteEditor}${editor.id}`, getHttpConfig())
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
