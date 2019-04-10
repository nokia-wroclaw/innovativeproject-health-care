import { getJwt } from "./authorization";

const baseURL = "http://localhost:5000";

export const endpoints = {
  login: `${baseURL}/auth`,
  getUsersByName: `${baseURL}/users?q=`, //${phrase}
  getEditors: `${baseURL}/editors`,
  putEditor: `${baseURL}/editors/`, //${id}
  deleteEditor: `${baseURL}/editors/` //${id}
};

export const getHttpConfig = () => {
  const jwt = getJwt();
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
};
