import {
  SET_USER,
  LOGOUT,
  OPTION_SELECTED,
  ADD_EDITOR,
  SET_USER_TEAMS_DETAILS,
  SET_USER_MANAGING_DETAILS,
  SET_USER_TRIBES_DETAILS,
  SET_USER_EDITING_DETAILS
} from "../actions/types";
import * as auth from "../../services/auth";

const initialState = {};

let userData;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const menu = auth.getMenu(action.payload);
      return {
        ...state,
        userData: action.payload,
        menu
      };
    case OPTION_SELECTED:
      return {
        ...state,
        activeOption: action.payload
      };
    case LOGOUT:
      return {
        ...initialState
      };

    case ADD_EDITOR:
      userData = { ...state.userData };
      if (action.payload.id === state.userData.id)
        userData.roles.push("editor");
      return {
        ...state,
        userData
      };

    case SET_USER_TEAMS_DETAILS:
      return {
        ...state,
        teams: action.payload
      };

    case SET_USER_MANAGING_DETAILS:
      return {
        ...state,
        managing: action.payload
      };

    case SET_USER_TRIBES_DETAILS:
      return {
        ...state,
        tribes: action.payload
      };

    case SET_USER_EDITING_DETAILS:
      return {
        ...state,
        editing: action.payload
      };

    default:
      return state;
  }
}
