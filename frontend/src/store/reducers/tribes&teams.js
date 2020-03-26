import {map, get, keyBy} from 'lodash/fp';
import {createSelector} from 'reselect';

import {
  SET_TRIBES,
  SET_TRIBE_EDITORS,
  SET_TEAMS_IN_TRIBE,
  ADD_TRIBE,
  DELETE_TRIBE,
  UPDATE_TRIBE_NAME,
  SET_TEAM_MANAGERS,
  SET_TEAM_MEMBERS,
  ADD_EDITOR_TO_TRIBE,
  DELETE_EDITOR_FROM_TRIBE,
  ADD_TEAM_TO_TRIBE,
  DELETE_TEAM,
  UPDATE_TEAM_NAME,
  ADD_MANAGER_TO_TEAM,
  DELETE_MANAGER_FROM_TEAM,
  ADD_MEMBER_TO_TEAM,
  DELETE_MEMBER_FROM_TEAM,
  RESTORE_TEAM, ADD_MANAGEMENT_TO_TRIBE
} from '../actions/types';

export const findTribe = (tribes, targetTribe) => {
  try {
    return tribes.find(tribe => tribe.id === targetTribe.id);
  } catch {
    return null;
  }
};

export const findTeam = (tribes, targetTeam) => {
  try {
    const tribe = tribes.find(tribe => tribe.id === targetTeam.tribe_id);
    return tribe.teams.find(team => team.id === targetTeam.id);
  } catch {
    return null;
  }
};

export const includesObjectWithId = (array, obj) => {
  try {
    if (array.find(element => element.id === obj.id)) return true;
    else return false;
  } catch {
    return false;
  }
};

export const uniquePush = (array, obj) => {
  if (!includesObjectWithId(array, obj)) array.push(obj);
};

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
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe) targetTribe.editors = action.payload.editors;
      return tribes;

    case SET_TEAMS_IN_TRIBE:
      tribes = [...state];
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe) targetTribe.teams = action.payload.teams;
      return tribes;

    case SET_TEAM_MANAGERS:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam) targetTeam.managers = action.payload.managers;
      return tribes;

    case SET_TEAM_MEMBERS:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam) targetTeam.members = action.payload.members;
      return tribes;

    case ADD_TRIBE:
      tribes = [...state];
      uniquePush(tribes, action.payload);
      return tribes;

    case DELETE_TRIBE:
      tribes = [...state];
      return tribes.filter(tribe => tribe.id !== action.payload.id);

    case UPDATE_TRIBE_NAME:
      tribes = [...state];
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe) targetTribe.name = action.payload.name;
      return tribes;

    case ADD_EDITOR_TO_TRIBE:
      tribes = [...state];
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe) {
        if (!targetTribe.editors) targetTribe.editors = [];
        uniquePush(targetTribe.editors, action.payload.editor);
      }
      return tribes;

    case DELETE_EDITOR_FROM_TRIBE:
      tribes = [...state];
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe && targetTribe.editors)
        targetTribe.editors = targetTribe.editors.filter(
          editor => editor.id !== action.payload.editor.id
        );
      return tribes;

    case ADD_MANAGEMENT_TO_TRIBE:
      tribes = [...state];
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe) {
        if (!targetTribe.managements) targetTribe.managements = [];
        uniquePush(targetTribe.managements, action.payload.managements);
      }
      return tribes;

    case ADD_TEAM_TO_TRIBE:
      tribes = [...state];
      targetTribe = findTribe(tribes, action.payload.tribe);
      if (targetTribe) {
        if (!targetTribe.teams) targetTribe.teams = [];
        uniquePush(targetTribe.teams, action.payload.team);
      }
      return tribes;

    case DELETE_TEAM:
      tribes = [...state];
   
      targetTribe = tribes.find(
        tribe => tribe.id === action.payload.team.tribe_id
      );

      if (targetTribe)
        targetTribe.teams = targetTribe.teams.map(
          team => {
            if (team.id === action.payload.team.id) {
              team.deleted = true;
            }
            return team;
          } 
        );
      return tribes;

    case UPDATE_TEAM_NAME:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam) targetTeam.name = action.payload.name;
      return tribes;

    case ADD_MANAGER_TO_TEAM:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam) {
        if (!targetTeam.managers) targetTeam.managers = [];
        uniquePush(targetTeam.managers, action.payload.user);
      }
      return tribes;

    case DELETE_MANAGER_FROM_TEAM:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam)
        targetTeam.managers = targetTeam.managers.filter(
          user => user.id !== action.payload.user.id
        );
      return tribes;

    case ADD_MEMBER_TO_TEAM:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam) {
        if (!targetTeam.members) targetTeam.members = [];
        uniquePush(targetTeam.members, action.payload.user);
      }
      return tribes;

    case DELETE_MEMBER_FROM_TEAM:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam)
        targetTeam.members = targetTeam.members.filter(
          user => user.id !== action.payload.user.id
        );
      return tribes;

    case RESTORE_TEAM:
      tribes = [...state];
      targetTeam = findTeam(tribes, action.payload.team);
      if (targetTeam) targetTeam.deleted = action.payload.team.deleted;
      return tribes;

    default:
      return state;
  }
}

export const getTribesForSelector = createSelector(
  get('tribes'),
  map(tribe => ({
    ...tribe,
    text: tribe.name,
    value: tribe.id
  }))
);

export const getTribesById = createSelector(
  get('tribes'),
  keyBy('id')
);
