import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "./types";
import axios from "axios";
import { endpoints, getHttpConfig } from "../../services/http";

export const setEditors = () => dispatch => {
  return axios.get(endpoints.getEditors, getHttpConfig()).then(response => {
    dispatch({
      type: SET_EDITORS,
      payload: response.data
    });
  });
};

export const addEditor = editor => dispatch => {
  return axios
    .put(`${endpoints.putEditor}${editor.id}`, {}, getHttpConfig())
    .then(
      dispatch({
        type: ADD_EDITOR,
        payload: editor
      })
    );
};

export const deleteEditor = editor => dispatch => {
  return axios
    .delete(`${endpoints.deleteEditor}${editor.id}`, getHttpConfig())
    .then(
      dispatch({
        type: DELETE_EDITOR,
        payload: editor
      })
    );
};
