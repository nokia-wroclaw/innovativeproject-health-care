import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./../editors";
import { SET_EDITORS, ADD_EDITOR, DELETE_EDITOR } from "../types";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

describe("async actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("sholud create SET_EDITORS when fetching editors has been done", () => {
    const editors = [
      { id: 1, name: "John Smith" },
      { id: 2, name: "Michael Smith" }
    ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: editors
      });
    });

    const expectedActions = [
      {
        type: SET_EDITORS,
        payload: editors
      }
    ];

    const store = mockStore({ editors: [] });

    return store.dispatch(actions.setEditors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("sholud create ADD_EDITOR when adding editor has been done", () => {
    const user = { id: 1, name: "John Smith" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: user
      });
    });

    const expectedActions = [
      {
        type: ADD_EDITOR,
        payload: user
      }
    ];

    const store = mockStore({ editors: [] });

    return store.dispatch(actions.addEditor(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("sholud create DELETE_EDITOR when deleting editor has been done", () => {
    const editor = { id: 1, name: "John Smith" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: editor
      });
    });

    const expectedActions = [
      {
        type: DELETE_EDITOR,
        payload: editor
      }
    ];

    const store = mockStore({ editors: [{ id: 1, name: "John Smith" }] });

    return store.dispatch(actions.deleteEditor(editor)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
