import axios from "axios";
import { getToken } from "./auth";

const baseURL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_API_BASE_URL
    : `${window.location.protocol}//${window.location.host}/api`;

export const endpoints = {
  login: `${baseURL}/auth`,
  users: "/users",
  editors: "/editors",
  tribes: "/tribes",
  teams: "/teams",
  surveys: "/surveys",
  results: "/results"
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
