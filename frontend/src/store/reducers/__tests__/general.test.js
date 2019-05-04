import reducer from "../general";
import * as types from "../../actions/types";

describe("general reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({ openLoginModal: false });
  });

  it("should handle OPEN_LOGIN_MODAL", () => {
    expect(
      reducer(
        {},
        {
          type: types.OPEN_LOGIN_MODAL
        }
      )
    ).toEqual({
      openLoginModal: true
    });
  });

  it("should handle CLOSE_LOGIN_MODAL", () => {
    expect(
      reducer(
        {},
        {
          type: types.CLOSE_LOGIN_MODAL
        }
      )
    ).toEqual({
      openLoginModal: false
    });
  });
});
