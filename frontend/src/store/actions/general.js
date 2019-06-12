import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "./types";

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL
});

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL
});

export const handleFetchingError = error => dispatch => {
  try {
    switch (error.response.status) {
      case 401:
        return dispatch(openLoginModal());

      case 422:
        return dispatch(openLoginModal());

      default:
        return;
    }
  } catch {
    alert(
      "Something went wrong. Please check your Internet connection and try again."
    );
  }
};
