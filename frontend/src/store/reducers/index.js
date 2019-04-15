import { combineReducers } from "redux";
import userReducer from "./user";
import surveyReducer from "./survey";
import editorsReducer from "./editors";
import tribesReducer from "./tribes";
import generalReducer from "./general";

export default combineReducers({
  user: userReducer,
  editors: editorsReducer,
  tribes: tribesReducer,
  survey: surveyReducer,
  general: generalReducer
});
