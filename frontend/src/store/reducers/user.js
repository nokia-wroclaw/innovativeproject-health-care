import { LOGIN, LOGOUT, OPTION_SELECTED } from "../actions/types";

const userMenu = [
  { name: "Results for your tribe", path: "/tribe_overview" },
  { name: "Statistics", path: "/statistics" },
  { name: "Fill survey", path: "/fill_survey" },
  { name: "Action items", path: "/action_items" }
];

const wardenMenu = [
  ...userMenu,
  { name: "Comments", path: "/users_comments" },
  { name: "Edit survey", path: "/edit_survey" }
];

const editorMenu = [
  ...wardenMenu,
  { name: "Users management", path: "/users_management" }
];

const adminMenu = [
  ...editorMenu,
  { name: "Admin panel", path: "/admin_panel" }
];

const menu = adminMenu;

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
