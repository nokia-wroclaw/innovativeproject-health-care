import mockAxios from "axios";
import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../teams";
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

  it("setTeamManagers should create SET_TEAM_MANAGERS when fetching team's managers has been done", async () => {
    const team = { id: 1, name: "team 1", managers: [] };
    const managers = [{ id: 2, name: "John Smith" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: managers });
    });

    const expectedActions = [
      {
        type: types.SET_TEAM_MANAGERS,
        payload: { team, managers }
      }
    ];

    await store.dispatch(actions.setTeamManagers(team));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}/managers`
    );
  });

  it("setTeamMembers should create SET_TEAM_MEMBERS when fetching team's memberss has been done", async () => {
    const team = { id: 1, name: "team 1", managers: [] };
    const members = [{ id: 2, name: "John Smith" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: members });
    });

    const expectedActions = [
      {
        type: types.SET_TEAM_MEMBERS,
        payload: { team, members }
      }
    ];

    await store.dispatch(actions.setTeamMembers(team));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}/users`
    );
  });

  it("updateTeamName should create UPDATE_TEAM_NAME when updating team's name has been done", async () => {
    const team = { id: 1, name: "team 1", tribe_id: 1 };
    const newName = "team 2";
    mockAxios.put.mockImplementationOnce(() => {
      httpCallCount.put++;
      return Promise.resolve();
    });

    const expectedActions = [
      {
        type: types.UPDATE_TEAM_NAME,
        payload: { team, name: newName }
      }
    ];

    await store.dispatch(actions.updateTeamName(team, newName));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.put).toHaveBeenCalledTimes(httpCallCount.put);
    expect(mockAxios.put).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}`,
      {
        tribe_id: team.tribe_id,
        name: newName
      }
    );
  });

  it("deleteTeam should create DELETE_TEAM when deleting team has been done", async () => {
    const team = { id: 1, name: "team 1" };
    mockAxios.delete.mockImplementationOnce(() => {
      httpCallCount.delete++;
      return Promise.resolve();
    });

    const expectedActions = [
      {
        type: types.DELETE_TEAM,
        payload: { team }
      }
    ];

    await store.dispatch(actions.deleteTeam(team));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(httpCallCount.delete);
    expect(mockAxios.delete).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}`
    );
  });

  it("addManagerToTeam should create ADD_MANAGER_TO_TEAM when adding manager to team has been done", async () => {
    const team = { id: 1, name: "team 1", managers: [] };
    const manager = { id: 2, name: "John Smith" };
    mockAxios.put.mockImplementationOnce(() => {
      httpCallCount.put++;
      return Promise.resolve();
    });

    const expectedActions = [
      {
        type: types.ADD_MANAGER_TO_TEAM,
        payload: { team, user: manager }
      }
    ];

    await store.dispatch(actions.addManagerToTeam(team, manager));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.put).toHaveBeenCalledTimes(httpCallCount.put);
    expect(mockAxios.put).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}/managers/${manager.id}`
    );
  });

  it("deleteManagerFromTeam should create DELETE_MANAGER_FROM_TEAM when deleting manager from team has been done", async () => {
    const manager = { id: 2, name: "John Smith" };
    const team = { id: 1, name: "team 1", managers: [manager] };
    mockAxios.delete.mockImplementationOnce(() => {
      httpCallCount.delete++;
      return Promise.resolve();
    });

    const expectedActions = [
      {
        type: types.DELETE_MANAGER_FROM_TEAM,
        payload: { team, user: manager }
      }
    ];

    await store.dispatch(actions.deleteManagerFromTeam(team, manager));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(httpCallCount.delete);
    expect(mockAxios.delete).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}/managers/${manager.id}`
    );
  });

  it("addMemberToTeam should create ADD_MEMBER_TO_TEAM when adding user to team has been done", async () => {
    const team = { id: 1, name: "team 1", users: [] };
    const user = { id: 2, name: "John Smith" };
    mockAxios.put.mockImplementationOnce(() => {
      httpCallCount.put++;
      return Promise.resolve();
    });

    const expectedActions = [
      {
        type: types.ADD_MEMBER_TO_TEAM,
        payload: { team, user }
      }
    ];

    await store.dispatch(actions.addMemberToTeam(team, user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.put).toHaveBeenCalledTimes(httpCallCount.put);
    expect(mockAxios.put).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}/users/${user.id}`
    );
  });

  it("deleteMemberFromTeam should create DELETE_MEMBER_FROM_TEAM when deleting user from team has been done", async () => {
    const user = { id: 2, name: "John Smith" };
    const team = { id: 1, name: "team 1", users: [user] };
    mockAxios.delete.mockImplementationOnce(() => {
      httpCallCount.delete++;
      return Promise.resolve();
    });

    const expectedActions = [
      {
        type: types.DELETE_MEMBER_FROM_TEAM,
        payload: { team, user }
      }
    ];

    await store.dispatch(actions.deleteMemberFromTeam(team, user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(httpCallCount.delete);
    expect(mockAxios.delete).toHaveBeenLastCalledWith(
      `${endpoints.teams}/${team.id}/users/${user.id}`
    );
  });
});
