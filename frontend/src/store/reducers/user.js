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
import * as authorization from "../../services/authorization";

const initialState = {};
let userData;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const menu = authorization.getMenu(action.payload);
      return {
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
      userData = { ...state.userData };
      userData.teams = action.payload;
      return {
        ...state,
        userData
      };

    case SET_USER_MANAGING_DETAILS:
      userData = { ...state.userData };
      userData.managing = action.payload;
      return {
        ...state,
        userData
      };

    case SET_USER_TRIBES_DETAILS:
      userData = { ...state.userData };
      userData.tribes = action.payload;
      return {
        ...state,
        userData
      };

    case SET_USER_EDITING_DETAILS:
      userData = { ...state.userData };
      userData.editing = action.payload;
      return {
        ...state,
        userData
      };

    default:
      return state;
  }
}
