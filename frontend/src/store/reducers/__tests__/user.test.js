import reducer from "../user";
import * as types from "../../actions/types";
import * as auth from "../../../services/auth";

describe("user reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("should handle SET_USER", () => {
    const user = {
      id: 1,
      name: "John Smith",
      roles: ["user"]
    };
    const menu = auth.getMenu(user);
    expect(
      reducer(
        {},
        {
          type: types.SET_USER,
          payload: user
        }
      )
    ).toEqual({
      userData: user,
      menu
    });
  });

  it("should handle OPTION_SELECTED", () => {
    const optionName = "menu option 1";
    expect(
      reducer(
        {
          userData: {
            id: 1,
            name: "John Smith"
          }
        },
        {
          type: types.OPTION_SELECTED,
          payload: optionName
        }
      )
    ).toEqual({
      userData: {
        id: 1,
        name: "John Smith"
      },
      activeOption: optionName
    });
  });

  it("should handle LOGOUT", () => {
    expect(
      reducer(
        {
          userData: {
            id: 1,
            name: "John Smith"
          }
        },
        {
          type: types.LOGOUT
        }
      )
    ).toEqual({});
    expect(
      reducer(
        {},
        {
          type: types.LOGOUT
        }
      )
    ).toEqual({});
  });
});
