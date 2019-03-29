import { LOGIN, LOGOUT, OPTION_SELECTED } from "../actions/types";

const menu = [
  { name: "results for your tribe", path: "/tribe_overview" },
  { name: "statistics", path: "/statistics" },
  { name: "fill survey", path: "/survey" },
  { name: "action items", path: "/action_items" },
  { name: "users management", path: "/users_management" }
];

const initialState = { firstPath: menu[0].path };
const activeOption = menu[0].name;

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        userData: action.payload,
        menu,
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
