import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "../actions/types";

const initialState = {
  openLoginModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        openLoginModal: true
      };

    case CLOSE_LOGIN_MODAL:
      return {
        openLoginModal: false
      };

    default:
      return state;
  }
}
