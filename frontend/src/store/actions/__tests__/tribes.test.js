import mockAxios from "axios";
import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../tribes";
import * as types from "../types";
import { endpoints } from "./../../../services/http";

const middlewares = [thunk];
const mockStore = confiureMockStore(middlewares);

const httpCallCount = {
  get: 0,
  post: 0,
  put: 0,
  delete: 0
};

describe("async actions", () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it("setTribes should create SET_TRIBES when fetching tribes has been done", async () => {
    const tribes = [{ id: 1, name: "tribe 1" }, { id: 2, name: "tribe 2" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: tribes });
    });
    const expectedActions = [
      {
        type: types.SET_TRIBES,
        payload: tribes
      }
    ];

    await store.dispatch(actions.setTribes());
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(endpoints.tribes);
  });

  it("setTribeEditors should create SET_TRIBE_EDITORS when fetching tribe's editors has been done", async () => {
    const tribe = { id: 1, name: "tribe 1" };
    const editors = [
      { id: 2, name: "John Smith" },
      { id: 3, name: "Anna Smith" }
    ];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: editors });
    });

    const expectedActions = [
      {
        type: types.SET_TRIBE_EDITORS,
        payload: { tribe, editors }
      }
    ];

    await store.dispatch(actions.setTribeEditors(tribe));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}/editors`
    );
  });

  it("setTeamsInTribe should create SET_TEAMS_IN_TRIBE when fetching tribe's teams has been done", async () => {
    const tribe = { id: 1, name: "tribe 1" };
    const teams = [{ id: 2, name: "team 1" }, { id: 3, name: "team 2" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: teams });
    });

    const expectedActions = [
      {
        type: types.SET_TEAMS_IN_TRIBE,
        payload: { tribe, teams }
      }
    ];

    await store.dispatch(actions.setTeamsInTribe(tribe));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}/teams`
    );
  });

  it("addTribe should create ADD_TRIBE when adding tribe has been done", async () => {
    const tribe = { id: 1, name: "tribe 1" };
    mockAxios.post.mockImplementationOnce(() => {
      httpCallCount.post++;
      return Promise.resolve({ data: tribe });
    });

    const expectedActions = [
      {
        type: types.ADD_TRIBE,
        payload: tribe
      }
    ];

    await store.dispatch(actions.addTribe(tribe.name));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalledTimes(httpCallCount.post);
    expect(mockAxios.post).toHaveBeenLastCalledWith(`${endpoints.tribes}`, {
      name: tribe.name
    });
  });

  it("deleteTribe should create DELETE_TRIBE when deleting tribe has been done", async () => {
    const tribe = { id: 1, name: "tribe 1" };
    mockAxios.delete.mockImplementationOnce(() => {
      httpCallCount.delete++;
      return Promise.resolve({ data: tribe });
    });

    const expectedActions = [
      {
        type: types.DELETE_TRIBE,
        payload: tribe
      }
    ];

    await store.dispatch(actions.deleteTribe(tribe));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(httpCallCount.delete);
    expect(mockAxios.delete).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}`
    );
  });

  it("updateTribeName should create UPDATE_TRIBE_NAME when updating tribe's name has been done", async () => {
    const tribe = { id: 1, name: "tribe 1" };
    const newName = "tribe 2";
    mockAxios.put.mockImplementationOnce(() => {
      httpCallCount.put++;
      return Promise.resolve({ data: {} });
    });

    const expectedActions = [
      {
        type: types.UPDATE_TRIBE_NAME,
        payload: { tribe, name: newName }
      }
    ];

    await store.dispatch(actions.updateTribeName(tribe, newName));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.put).toHaveBeenCalledTimes(httpCallCount.put);
    expect(mockAxios.put).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}`,
      { name: newName }
    );
  });

  it("addEditorToTribe should create ADD_EDITOR_TO_TRIBE when adding editor to tribe has been done", async () => {
    const tribe = { id: 1, name: "tribe 1", editors: [] };
    const editor = { id: 2, name: "John Smith" };
    mockAxios.put.mockImplementationOnce(() => {
      httpCallCount.put++;
      return Promise.resolve({ data: {} });
    });

    const expectedActions = [
      {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: { tribe, editor }
      }
    ];

    await store.dispatch(actions.addEditorToTribe(tribe, editor));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.put).toHaveBeenCalledTimes(httpCallCount.put);
    expect(mockAxios.put).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}/editors/${editor.id}`
    );
  });

  it("deleteEditorFromTribe should create DELETE_EDITOR_FROM_TRIBE when deleting editor from tribe has been done", async () => {
    const editor = { id: 2, name: "John Smith" };
    const tribe = { id: 1, name: "tribe 1", editors: [editor] };
    mockAxios.delete.mockImplementationOnce(() => {
      httpCallCount.delete++;
      return Promise.resolve({ data: {} });
    });

    const expectedActions = [
      {
        type: types.DELETE_EDITOR_FROM_TRIBE,
        payload: { tribe, editor }
      }
    ];

    await store.dispatch(actions.deleteEditorFromTribe(tribe, editor));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(httpCallCount.delete);
    expect(mockAxios.delete).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}/editors/${editor.id}`
    );
  });

  it("addTeamToTribe should create ADD_TEAM_TO_TRIBE when adding team to tribe has been done", async () => {
    const team = { id: 2, name: "team 1" };
    const tribe = { id: 1, name: "tribe 1", teams: [team] };
    mockAxios.post.mockImplementationOnce(() => {
      httpCallCount.post++;
      return Promise.resolve({ data: team });
    });

    const expectedActions = [
      {
        type: types.ADD_TEAM_TO_TRIBE,
        payload: { tribe, team }
      }
    ];

    await store.dispatch(actions.addTeamToTribe(tribe, team.name));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalledTimes(httpCallCount.post);
    expect(mockAxios.post).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}/teams`,
      { name: team.name }
    );
  });
});
