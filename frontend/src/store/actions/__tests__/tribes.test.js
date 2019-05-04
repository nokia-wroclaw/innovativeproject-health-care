import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./../tribes";
import * as types from "../types";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

describe("async actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("setTribes should create SET_TRIBES when fetching tribes has been done", () => {
    const tribes = [{ id: 1, name: "tribe 1" }, { id: 2, name: "tribe 2" }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: tribes
      });
    });

    const expectedActions = [
      {
        type: types.SET_TRIBES,
        payload: tribes
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.setTribes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("setTribeEditors should create SET_TRIBE_EDITORS when fetching tribe's editors has been done", () => {
    const tribe = { id: 1, name: "tribe 1" };
    const editors = [
      { id: 2, name: "John Smith" },
      { id: 3, name: "Anna Smith" }
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
        type: types.SET_TRIBE_EDITORS,
        payload: { tribe, editors }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.setTribeEditors(tribe)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("setTeamsInTribe should create SET_TEAMS_IN_TRIBE when fetching tribe's teams has been done", () => {
    const tribe = { id: 1, name: "tribe 1" };
    const teams = [{ id: 2, name: "team 1" }, { id: 3, name: "team 2" }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: teams
      });
    });

    const expectedActions = [
      {
        type: types.SET_TEAMS_IN_TRIBE,
        payload: { tribe, teams }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.setTeamsInTribe(tribe)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addTribe should create ADD_TRIBE when adding tribe has been done", () => {
    const tribe = { id: 1, name: "tribe 1" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: tribe
      });
    });

    const expectedActions = [
      {
        type: types.ADD_TRIBE,
        payload: tribe
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.addTribe(tribe.name)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteTribe should create DELETE_TRIBE when deleting tribe has been done", () => {
    const tribe = { id: 1, name: "tribe 1" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_TRIBE,
        payload: tribe
      }
    ];

    const store = mockStore({ tribes: [tribe] });

    return store.dispatch(actions.deleteTribe(tribe)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("updateTribeName should create UPDATE_TRIBE_NAME when updating tribe's name has been done", () => {
    const tribe = { id: 1, name: "tribe 1" };
    const newName = "tribe 2";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.UPDATE_TRIBE_NAME,
        payload: { tribe, name: newName }
      }
    ];

    const store = mockStore({ tribes: [tribe] });

    return store.dispatch(actions.updateTribeName(tribe, newName)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addEditorToTribe should create ADD_EDITOR_TO_TRIBE when adding editor to tribe has been done", () => {
    const tribe = { id: 1, name: "tribe 1", editors: [] };
    const editor = { id: 2, name: "John Smith" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: { tribe, editor }
      }
    ];

    const store = mockStore({
      tribes: [tribe]
    });

    return store.dispatch(actions.addEditorToTribe(tribe, editor)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteEditorFromTribe should create DELETE_EDITOR_FROM_TRIBE when deleting editor from tribe has been done", () => {
    const editor = { id: 2, name: "John Smith" };
    const tribe = { id: 1, name: "tribe 1", editors: [editor] };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_EDITOR_FROM_TRIBE,
        payload: { tribe, editor }
      }
    ];

    const store = mockStore({
      tribes: [tribe]
    });

    return store
      .dispatch(actions.deleteEditorFromTribe(tribe, editor))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("addTeamToTribe should create ADD_TEAM_TO_TRIBE when adding team to tribe has been done", () => {
    const team = { id: 2, name: "team 1" };
    const tribe = { id: 1, name: "tribe 1", teams: [team] };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: team
      });
    });

    const expectedActions = [
      {
        type: types.ADD_TEAM_TO_TRIBE,
        payload: { tribe, team }
      }
    ];

    const store = mockStore({
      tribes: [tribe]
    });

    return store.dispatch(actions.addTeamToTribe(tribe, team.name)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
