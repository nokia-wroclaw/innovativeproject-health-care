import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TRIBE_TEAMS,
  ADD_TRIBE,
  DELETE_TRIBE,
  SET_TEAM_MANAGERS,
  SET_TEAM_MEMBERS
} from "../actions/types";

const initialState = [];

let tribes = [],
  targetTribe = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TRIBES:
      return action.payload;

    case SET_TRIBE_EDITORS:
      tribes = [...state];
      targetTribe = tribes.find(tribe => tribe.id === action.payload.tribe_id);
      targetTribe.editors = action.payload.editors;
      return tribes;

    case SET_TRIBE_TEAMS:
      tribes = [...state];
      targetTribe = tribes.find(tribe => tribe.id === action.payload.tribe_id);
      targetTribe.teams = action.payload.teams;
      return tribes;

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
