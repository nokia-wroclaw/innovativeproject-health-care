import { LOGIN, LOGOUT, OPTION_SELECTED } from "../actions/types";
import authorization from "../../services/authorization";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const menu = authorization.getMenu(action.payload);
      // const activeOption = menu[0].name;

      return {
        ...state,
        userData: action.payload,
        menu
        // activeOption
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
