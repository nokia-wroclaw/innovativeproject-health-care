import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../user";
import * as auth from "../../../services/auth";
import { SET_USER, LOGOUT, OPTION_SELECTED, CLOSE_LOGIN_MODAL } from "../types";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

describe("async actions", () => {
  it("login sholud create SET_USER and CLOSE_LOGIN_MODAL when loging in has been done", async () => {
    const user = { id: 1234, name: "John Smith", roles: ["user"] };
    auth.login = jest.fn((username, password) => Promise.resolve(user));
    const expectedActions = [
      {
        type: SET_USER,
        payload: user
      },
      {
        type: CLOSE_LOGIN_MODAL
      }
    ];

    const store = mockStore({ user: {} });
    await store.dispatch(actions.login("john", "password"));
    expect(store.getActions()).toEqual(expectedActions);
    expect(auth.login).toHaveBeenCalledTimes(1);
    expect(auth.login).toHaveBeenCalledWith("john", "password");
  });
});

describe("actions", () => {
  it("setUser sholud create an action to set the user in store", () => {
    const user = { name: "John" };
    const expectedAction = {
      type: SET_USER,
      payload: user
    };
    expect(actions.setUser(user)).toEqual(expectedAction);
  });

  it("logout sholud create an action to logout the user", () => {
    const expectedAction = {
      type: LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });

  it("setMenuOption sholud create an action to set a menu option", () => {
    const optionName = "home page";
    const expectedAction = {
      type: OPTION_SELECTED,
      payload: optionName
    };
    expect(actions.setMenuOption(optionName)).toEqual(expectedAction);
  });
});
