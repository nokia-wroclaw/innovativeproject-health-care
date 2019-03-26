import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {};

const menu = [
  { name: "fill survey", path: "/survey" },
  { name: "results for your tribe", path: "/tribe_overview" },
  { name: "statistics", path: "/statistics" },
  { name: "action items", path: "/action_items" },
  { name: "users management", path: "/users_management" }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        userData: action.payload,
        menu
      };
    case LOGOUT:
      return {
        initialState
      };

    default:
      return state;
  }
}
