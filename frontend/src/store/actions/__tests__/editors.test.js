import mockAxios from "axios";
import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../editors";
import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "../types";
import { endpoints } from "./../../../services/http";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

describe("async actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it("setEditors sholud create SET_EDITORS when fetching editors has been done", async () => {
    const editors = [
      { id: 1, name: "John Smith" },
      { id: 2, name: "Michael Smith" }
    ];
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: editors })
    );
    const expectedActions = [
      {
        type: SET_EDITORS,
        payload: editors
      }
    ];

    await store.dispatch(actions.setEditors());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(endpoints.editors);
  });

  it("addEditor sholud create ADD_EDITOR when adding editor has been done", async () => {
    const user = { id: 1, name: "John Smith" };
    mockAxios.put.mockImplementationOnce(() => Promise.resolve({ data: user }));
    const expectedActions = [
      {
        type: ADD_EDITOR,
        payload: user
      }
    ];

    await store.dispatch(actions.addEditor(user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect(mockAxios.put).toHaveBeenCalledWith(
      `${endpoints.editors}/${user.id}`
    );
  });

  it("deleteEditor sholud create DELETE_EDITOR when deleting editor has been done", async () => {
    const editor = { id: 1, name: "John Smith" };
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({ data: editor })
    );

    const expectedActions = [
      {
        type: DELETE_EDITOR,
        payload: editor
      }
    ];

    await store.dispatch(actions.deleteEditor(editor));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `${endpoints.editors}/${editor.id}`
    );
  });
});
