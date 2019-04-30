import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "./types";

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL
});

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL
});

export const handleFetchingError = error => dispatch => {
  switch (error.response.status) {
    case 401:
      dispatch(openLoginModal());
      break;

    case 422:
      dispatch(openLoginModal());
      break;

    default:
      return;
  }
};
