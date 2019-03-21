import { combineReducers } from "redux";
import userReducer from "./user";
import surveyReducer from "./survey";

export default combineReducers({
  user: userReducer,
  survey: surveyReducer
});
