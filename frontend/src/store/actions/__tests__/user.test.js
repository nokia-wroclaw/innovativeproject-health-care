import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./../user";
import { SET_USER, LOGOUT, OPTION_SELECTED, CLOSE_LOGIN_MODAL } from "../types";
import * as authorization from "../../../services/authorization";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

describe("async actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("login sholud create SET_USER, CLOSE_LOGIN_MODAL and OPTION_SELECTED when loging in has been done", () => {
    const user = { id: 1234, name: "John Smith", roles: ["user"] };
    const optionName = authorization.getMenu(user)[0].name;
    const jwt =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoxMjM0LCJuYW1lIjoiSm9obiBTbWl0aCIsInJvbGVzIjpbInVzZXIiXX19.7cVQobl2mowgk0zbOkQplsynTFMMmqWxhy3GUzBGpKk";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { access_token: jwt }
      });
    });
    const expectedActions = [
      {
        type: SET_USER,
        payload: user
      },
      {
        type: CLOSE_LOGIN_MODAL
      },
      {
        type: OPTION_SELECTED,
        payload: optionName
      }
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(actions.login("john", "password")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
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
