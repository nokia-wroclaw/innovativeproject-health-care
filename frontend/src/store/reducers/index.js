import { combineReducers } from "redux";
import userReducer from "./user";
import surveyReducer from "./survey";
import editorsReducer from "./editors";

export default combineReducers({
  user: userReducer,
  editors: editorsReducer,
  survey: surveyReducer
});
