import axios from "axios";
import { endpoints, httpConfig } from "./http";

export const getUsersByName = async phrase => {
  const URL = `${endpoints.getUsersByName}${phrase}`;
  const response = await axios.get(URL, httpConfig);
  return response;
};
