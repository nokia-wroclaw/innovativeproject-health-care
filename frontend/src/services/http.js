import { getJwt } from "./authorization";

const baseURL = "http://localhost:5000";

export const endpoints = {
  login: `${baseURL}/auth`,
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
  getTribe: `${baseURL}/tribes/` //${id}
};

export const getHttpConfig = () => {
  const jwt = getJwt();
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
};
