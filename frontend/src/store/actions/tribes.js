import { SET_TRIBES, ADD_TRIBE, DELETE_TRIBE } from "./types";
import axios from "axios";
import { endpoints, httpConfig } from "../../services/http";

/*
export const setTribes = () => dispatch => {
  return axios.get(endpoints.getTribes, httpConfig).then(response => {
    dispatch({
      type: SET_TRIBES,
      payload: response.data
    });
  });
};

export const addTribe = tribe => dispatch => {
  return axios.put(`${endpoints.putTribe}${tribe.id}`, {}, httpConfig).then(
    dispatch({
      type: ADD_TRIBE,
      payload: tribe
    })
  );
};

export const deleteTribe = tribe => dispatch => {
  return axios.delete(`${endpoints.deleteTribe}${tribe.id}`, httpConfig).then(
    dispatch({
      type: DELETE_TRIBE,
      payload: tribe
    })
  );
};

*/
