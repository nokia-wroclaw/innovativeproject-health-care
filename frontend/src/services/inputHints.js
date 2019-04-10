import axios from "axios";
import { endpoints, getHttpConfig } from "./http";

export const getUsersByName = async phrase => {
  const URL = `${endpoints.getUsersByName}${phrase}`;
  const response = await axios.get(URL, getHttpConfig());
  return response;
};
