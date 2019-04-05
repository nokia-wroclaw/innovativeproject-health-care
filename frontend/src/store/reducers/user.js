import { LOGIN, LOGOUT, OPTION_SELECTED } from "../actions/types";
import authorization from "../../services/authorization";

const menu = authorization.adminMenu;

const initialState = { firstPath: menu[0].path };
const activeOption = menu[0].name;

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        userData: action.payload,
        menu, // menu: authorization.getMenu(action.payload),
        activeOption
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
