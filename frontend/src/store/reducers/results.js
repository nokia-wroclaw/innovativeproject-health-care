import {
  SET_TEAM_ANSWERS,
  SET_TRIBE_HISTORY,
  SET_TRIBE_MATRIX,
  RESET_TRIBE_MATRIX,
  SET_TRIBE_PERIODS
} from "../actions/types";

const initialState = {
  team: [],
  tribeMatrix: {},
  tribeHistory: {},
  tribePeriods: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TEAM_ANSWERS:
      return {
        ...state,
        team: action.payload
      };
    case SET_TRIBE_MATRIX:
      return {
        ...state,
        tribeMatrix: action.payload
      };
    case RESET_TRIBE_MATRIX:
      return {
        ...state,
        tribeMatrix: []
      };
    case SET_TRIBE_HISTORY:
      return {
        ...state,
        tribeHistory: action.payload
      };
    case SET_TRIBE_PERIODS:
      return {
        ...state,
        tribePeriods: action.payload
      };

    default:
      return state;
  }
}
