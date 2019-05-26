import axios from "axios";
import { getToken } from "./authorization";

const baseURL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_API_BASE_URL
    : `${window.location.protocol}//${window.location.host}/api`;

export const endpoints = {
  login: `${baseURL}/auth`,
  getUserData: `${baseURL}/users/`, //${id}
  getUsersByName: `${baseURL}/users?q=`, //${phrase}
  //--- Editors ---
  getEditors: `${baseURL}/editors`,
  putEditor: `${baseURL}/editors/`, //${id}
  deleteEditor: `${baseURL}/editors/`, //${id}
  //--- Tribes ---
  getTribes: `${baseURL}/tribes`,
  postTribe: `${baseURL}/tribes`,
  putTribe: `${baseURL}/tribes/`, //${id}
  deleteTribe: `${baseURL}/tribes/`, //${id}
  getTribe: `${baseURL}/tribes/`, //${id}
  //--- Teams ---
  teams: `${baseURL}/teams/`,
  //--- Surveys ---
  getSurvey: `${baseURL}/surveys/`, //${id}
  //--- Results ---
  getResults: `${baseURL}/results`
};

export const getHttpConfig = () => {
  const jwt = getToken();
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
};

let instance = axios.create({
  baseURL
});

instance.interceptors.request.use(config => {
  const token = getToken();
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export const http = instance;
