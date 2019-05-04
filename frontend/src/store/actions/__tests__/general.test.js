import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../general";
import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from "../types";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

describe("actions", () => {
  it("sholud create an action to open login modal", () => {
    const expectedAction = {
      type: OPEN_LOGIN_MODAL
    };
    expect(actions.openLoginModal()).toEqual(expectedAction);
  });

  it("sholud create an action to close login modal", () => {
    const expectedAction = {
      type: CLOSE_LOGIN_MODAL
    };
    expect(actions.closeLoginModal()).toEqual(expectedAction);
  });

  it("handleFetchingError should create OPEN_LOGIN_MODAL when error.response.status is 401", async () => {
    const error = {
      response: {
        status: 401
      }
    };
    const expectedActions = [
      {
        type: OPEN_LOGIN_MODAL
      }
    ];

    const store = mockStore();
    await store.dispatch(actions.handleFetchingError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("handleFetchingError should create OPEN_LOGIN_MODAL when error.response.status is 422", async () => {
    const error = {
      response: {
        status: 422
      }
    };
    const expectedActions = [
      {
        type: OPEN_LOGIN_MODAL
      }
    ];

    const store = mockStore();
    await store.dispatch(actions.handleFetchingError(error));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
