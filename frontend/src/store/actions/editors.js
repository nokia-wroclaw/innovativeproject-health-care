import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "./types";
import axios from "axios";
import { endpoints, httpConfig } from "../../services/http";

export const setEditors = () => dispatch => {
  return axios.get(endpoints.getEditors, httpConfig).then(response => {
    dispatch({
      type: SET_EDITORS,
      payload: response.data
    });
  });
};

export const addEditor = editor => dispatch => {
  return axios.put(`${endpoints.putEditor}${editor.id}`, {}, httpConfig).then(
    dispatch({
      type: ADD_EDITOR,
      payload: editor
    })
  );
};

export const deleteEditor = editor => dispatch => {
  return axios.delete(`${endpoints.deleteEditor}${editor.id}`, httpConfig).then(
    dispatch({
      type: DELETE_EDITOR,
      payload: editor
    })
  );
};
