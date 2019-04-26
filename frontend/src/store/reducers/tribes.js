import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TEAMS_IN_TRIBE,
  ADD_TRIBE,
  DELETE_TRIBE,
  SET_TEAM_MANAGERS,
  SET_TEAM_MEMBERS
} from "../actions/types";

const initialState = [];

let tribes = [],
  targetTribe = null,
  targetTeam = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TRIBES:
      return action.payload;

    case SET_TRIBE_EDITORS:
      tribes = [...state];
      targetTribe = tribes.find(tribe => tribe.id === action.payload.tribe_id);
      targetTribe.editors = action.payload.editors;
      return tribes;

    case SET_TEAMS_IN_TRIBE:
      tribes = [...state];
      targetTribe = tribes.find(tribe => tribe.id === action.payload.tribe_id);
      targetTribe.teams = action.payload.teams;
      return tribes;

    case SET_TEAM_MANAGERS:
      tribes = [...state];
      targetTribe = tribes.find(tribe => tribe.id === action.payload.tribe_id);
      targetTeam = targetTribe.teams.find(
        team => team.id === action.payload.team_id
      );
      targetTeam.managers = action.payload.managers;
      return tribes;

    case SET_TEAM_MEMBERS:
      tribes = [...state];
      targetTribe = tribes.find(tribe => tribe.id === action.payload.tribe_id);
      targetTeam = targetTribe.teams.find(
        team => team.id === action.payload.team_id
      );
      targetTeam.members = action.payload.members;
      return tribes;

    case ADD_TRIBE:
      tribes = [...state];
      tribes.push(action.payload);
      return tribes;

    case DELETE_TRIBE:
      //...
      return state;

    default:
      return state;
  }
}
