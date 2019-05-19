import {
  SET_USER,
  LOGOUT,
  OPTION_SELECTED,
  ADD_EDITOR,
  SET_USER_TEAMS_DETAILS
} from '../actions/types';
import authorization from '../../services/authorization';

const initialState = {};
let userData;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      const menu = authorization.getMenu(action.payload);
      return {
        userData: action.payload,
        menu
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

    case ADD_EDITOR:
      userData = { ...state.userData };
      if (action.payload.id === state.userData.id)
        userData.roles.push('editor');
      return {
        ...state,
        userData
      };

    case SET_USER_TEAMS_DETAILS:
      userData = { ...state.userData };
      userData.teams = action.payload;
      return {
        ...state,
        userData
      };

    default:
      return state;
  }
}
