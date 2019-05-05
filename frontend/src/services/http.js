import { getJwt } from "./authorization";

const baseURL = process.env.REACT_APP_API_BASE_URL;

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
  teams: `${baseURL}/teams/`
};

export const getHttpConfig = () => {
  const jwt = getJwt();
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
};
