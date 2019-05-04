import reducer from "../editors";
import * as types from "../../actions/types";

describe("editors reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it("should handle SET_EDITORS", () => {
    const editors = [
      {
        id: 1,
        name: "John Smith"
      },
      {
        id: 2,
        name: "Anna Smith"
      }
    ];
    expect(
      reducer([], {
        type: types.SET_EDITORS,
        payload: editors
      })
    ).toEqual(editors);
  });

  it("should handle ADD_EDITOR", () => {
    const editors = [
      {
        id: 1,
        name: "John Smith"
      },
      {
        id: 2,
        name: "Anna Smith"
      }
    ];
    expect(
      reducer(editors, {
        type: types.ADD_EDITOR,
        payload: {
          id: 1,
          name: "John Smith"
        }
      })
    ).toEqual(editors);
    expect(
      reducer(editors, {
        type: types.ADD_EDITOR,
        payload: {
          id: 3,
          name: "Mark Smith"
        }
      })
    ).toEqual([
      ...editors,
      {
        id: 3,
        name: "Mark Smith"
      }
    ]);
  });

  it("should handle DELETE_EDITOR", () => {
    const editors = [
      {
        id: 1,
        name: "John Smith"
      },
      {
        id: 2,
        name: "Anna Smith"
      }
    ];
    expect(
      reducer(editors, {
        type: types.DELETE_EDITOR,
        payload: {
          id: 1,
          name: "John Smith"
        }
      })
    ).toEqual([
      {
        id: 2,
        name: "Anna Smith"
      }
    ]);
    expect(
      reducer(editors, {
        type: types.DELETE_EDITOR,
        payload: {
          id: 3,
          name: "Mark Smith"
        }
      })
    ).toEqual(editors);
  });
});
