import _ from "lodash";
import axios from "axios";
import { endpoints } from "./http";
import jwtDecode from "jwt-decode";
import routes from "../static/routeURLs";

const roles = {
  user: "user",
  manager: "manager",
  editor: "editor",
  admin: "admin"
};
const setToken = token => sessionStorage.setItem("token", token);
const removeToken = () => sessionStorage.removeItem("token");
export const getToken = () => sessionStorage.getItem("token");

export const getUserData = () => {
  try {
    const jwt = getToken();
    const decoded = jwtDecode(jwt);
    return decoded.user;
  } catch {
    return null;
  }
};

export const login = async (username, password) => {
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`)
    }
  };
  return axios
    .post(endpoints.login, {}, config)
    .then(response => {
      const token = response.data.access_token;
      setToken(token);
      const { user } = jwtDecode(token);
      return user;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};

export const logout = () => removeToken();

const userMenu = [
  { name: "Results", path: routes.resultsMatrix },
  { name: "Statistics", path: routes.statistics },
  { name: "Fill survey", path: routes.fillSurvey }
];

const managerMenu = [
  { name: "Results", path: routes.resultsMatrix },
  { name: "Statistics", path: routes.statistics },
  { name: "Comments", path: routes.comments }
];

const editorMenu = [
  { name: "Results", path: routes.resultsMatrix },
  { name: "Statistics", path: routes.statistics },
  { name: "Edit survey", path: routes.editSurvey },
  { name: "Tribes management", path: routes.tribesManagement }
];

const adminMenu = [
  { name: "Tribes management", path: routes.tribesManagement },
  { name: "Admin panel", path: routes.adminPanel }
];

export const getMenu = user => {
  let menu = [];
  try {
    if (user.roles.includes(roles.user)) menu = [...menu, ...userMenu];
    if (user.roles.includes(roles.manager)) menu = [...menu, ...managerMenu];
    if (user.roles.includes(roles.editor)) menu = [...menu, ...editorMenu];
    if (user.roles.includes(roles.admin)) menu = [...menu, ...adminMenu];
  } catch {}
  return _.uniqBy(menu, "path");
};

export const isAdmin = user => {
  try {
    return user.roles.includes(roles.admin);
  } catch {
    return false;
  }
};

export const isEditor = user => {
  try {
    return user.roles.includes(roles.editor);
  } catch {
    return false;
  }
};

export const isManager = user => {
  try {
    return user.roles.includes(roles.manager);
  } catch {
    return false;
  }
};

export const isUser = user => {
  try {
    return user.roles.includes(roles.user);
  } catch {
    return false;
  }
};
