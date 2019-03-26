import { LOGIN } from "../actions/types";

const initialState = {
  name: "",
  type: "",
  menu: [
    { name: "fill survey", path: "/survey" },
    { name: "results for your tribe", path: "/tribe_overview" },
    { name: "statistics", path: "/statistics" },
    { name: "action items", path: "/action_items" },
    { name: "users management", path: "/users_management" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state
        //...
      };

    default:
      return state;
  }
}
