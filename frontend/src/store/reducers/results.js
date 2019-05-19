import {
  SET_TEAM_ANSWERS,
  SET_TRIBE_HISTORY,
  SET_TRIBE_MATRIX
} from "../actions/types";

const initialState = {
  team: {},
  tribeMatrix: {},
  tribeHistory: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TEAM_ANSWERS:
      return {
        ...state,
        team: action.payload,
      };
    case SET_TRIBE_MATRIX:
      return {
        ...state,
        tribeMatrix: action.payload,
      };
    case SET_TRIBE_HISTORY:
      return {
        ...state,
        tribeHistory: action.payload,
      };

    default:
      return state;
  }
}
