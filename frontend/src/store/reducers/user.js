import { SET_USER, LOGOUT, OPTION_SELECTED } from "../actions/types";
import authorization from "../../services/authorization";

const initialState = {};

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

    default:
      return state;
  }
}
