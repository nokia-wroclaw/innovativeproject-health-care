import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import * as actions from "./../teams";
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

  it("setTeamManagers should create SET_TEAM_MANAGERS when fetching team's managers has been done", () => {
    const team = { id: 1, name: "team 1", managers: [] };
    const managers = [{ id: 2, name: "John Smith" }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: managers
      });
    });

    const expectedActions = [
      {
        type: types.SET_TEAM_MANAGERS,
        payload: { team, managers }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.setTeamManagers(team)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("setTeamMembers should create SET_TEAM_MEMBERS when fetching team's memberss has been done", () => {
    const team = { id: 1, name: "team 1", managers: [] };
    const members = [{ id: 2, name: "John Smith" }];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: members
      });
    });

    const expectedActions = [
      {
        type: types.SET_TEAM_MEMBERS,
        payload: { team, members }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.setTeamMembers(team)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("updateTeamName should create UPDATE_TEAM_NAME when updating team's name has been done", () => {
    const team = { id: 1, name: "team 1" };
    const newName = "team 2";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.UPDATE_TEAM_NAME,
        payload: { team, name: newName }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.updateTeamName(team, newName)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteTeam should create DELETE_TEAM when deleting team has been done", () => {
    const team = { id: 1, name: "team 1" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_TEAM,
        payload: { team }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.deleteTeam(team)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addManagerToTeam should create ADD_MANAGER_TO_TEAM when adding manager to team has been done", () => {
    const team = { id: 1, name: "team 1", managers: [] };
    const manager = { id: 2, name: "John Smith" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.ADD_MANAGER_TO_TEAM,
        payload: { team, user: manager }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.addManagerToTeam(team, manager)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteManagerFromTeam should create DELETE_MANAGER_FROM_TEAM when deleting manager from team has been done", () => {
    const manager = { id: 2, name: "John Smith" };
    const team = { id: 1, name: "team 1", managers: [manager] };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_MANAGER_FROM_TEAM,
        payload: { team, user: manager }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store
      .dispatch(actions.deleteManagerFromTeam(team, manager))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("addMemberToTeam should create ADD_MEMBER_TO_TEAM when adding user to team has been done", () => {
    const team = { id: 1, name: "team 1", users: [] };
    const user = { id: 2, name: "John Smith" };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.ADD_MEMBER_TO_TEAM,
        payload: { team, user }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.addMemberToTeam(team, user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteMemberFromTeam should create DELETE_MEMBER_FROM_TEAM when deleting user from team has been done", () => {
    const user = { id: 2, name: "John Smith" };
    const team = { id: 1, name: "team 1", users: [user] };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const expectedActions = [
      {
        type: types.DELETE_MEMBER_FROM_TEAM,
        payload: { team, user }
      }
    ];

    const store = mockStore({ tribes: [] });

    return store.dispatch(actions.deleteMemberFromTeam(team, user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
