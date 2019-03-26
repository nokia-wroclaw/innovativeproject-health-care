import axios from "axios";
const apiEndpoint = "http://localhost:5000/auth";

export const login = (username, password) => {
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`)
    }
  };
  return axios.post(apiEndpoint, {}, config);
};
