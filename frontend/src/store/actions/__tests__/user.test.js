import * as actions from "./../user";
import { SET_USER, LOGOUT, OPTION_SELECTED } from "../types";

describe("actions", () => {
  it("sholud create an action to set the user in store", () => {
    const user = { name: "John" };
    const expectedAction = {
      type: SET_USER,
      payload: user
    };
    expect(actions.setUser(user)).toEqual(expectedAction);
  });

  it("sholud create an action to logout the user", () => {
    const expectedAction = {
      type: LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });

  it("sholud create an action to set a menu option", () => {
    const optionName = "home page";
    const expectedAction = {
      type: OPTION_SELECTED,
      payload: optionName
    };
    expect(actions.setMenuOption(optionName)).toEqual(expectedAction);
  });
});
