import { endpoints, http } from "./http";

export const getUsersByName = async (phrase, onlyEditors = false) => {
  let endpoint = onlyEditors ? endpoints.editors : endpoints.users;
  const URL = `${endpoint}?q=${phrase}`;
  return await http.get(URL);
};
