import { SET_TRIBES, ADD_TRIBE, DELETE_TRIBE } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TRIBES:
      return action.payload;

    case ADD_TRIBE:
      //...
      return state;

    case DELETE_TRIBE:
      //...
      return state;

    default:
      return state;
  }
}
