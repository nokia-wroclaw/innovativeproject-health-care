import { endpoints, http } from "./http";

export const getUsersByName = async phrase => {
  const URL = `${endpoints.users}?q=${phrase}`;
  const response = await http.get(URL);
  return response;
};
