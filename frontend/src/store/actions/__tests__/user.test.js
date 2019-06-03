import mockAxios from "axios";
import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../user";
import * as auth from "../../../services/auth";
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
  it("login sholud create SET_USER and CLOSE_LOGIN_MODAL when loging in has been done", async () => {
    const user = { id: 1234, name: "John Smith" };
    auth.login = jest.fn((username, password) => Promise.resolve(user));
    const expectedActions = [
      {
        type: types.SET_USER,
        payload: user
      },
      {
        type: types.CLOSE_LOGIN_MODAL
      }
    ];

    await store.dispatch(actions.login("john", "password"));
    expect(store.getActions()).toEqual(expectedActions);
    expect(auth.login).toHaveBeenCalledTimes(1);
    expect(auth.login).toHaveBeenCalledWith("john", "password");
  });

  it("updateUserData should create SET_USER when fetching user data has been done", async () => {
    const user = { id: 1234, name: "John Smith" };
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: user });
    });

    const expectedActions = [
      {
        type: types.SET_USER,
        payload: user
      }
    ];

    await store.dispatch(actions.updateUserData(user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.users}/${user.id}`
    );
  });

  it("setUserTeamsDetails should create SET_USER_TEAMS_DETAILS when fetching user's teams' details has been done", async () => {
    const user = { id: 1234, name: "John Smith" };
    const data = [{ id: 1, name: "team1" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data });
    });

    const expectedActions = [
      {
        type: types.SET_USER_TEAMS_DETAILS,
        payload: data
      }
    ];

    await store.dispatch(actions.setUserTeamsDetails(user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.users}/${user.id}/teams?role=member`
    );
  });

  it("setUserManagingDetails should create SET_USER_MANAGING_DETAILS when fetching details of teams managed by user has been done", async () => {
    const user = { id: 1234, name: "John Smith" };
    const data = [{ id: 1, name: "team1" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data });
    });

    const expectedActions = [
      {
        type: types.SET_USER_MANAGING_DETAILS,
        payload: data
      }
    ];

    await store.dispatch(actions.setUserManagingDetails(user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.users}/${user.id}/teams?role=manager`
    );
  });

  it("setUserTribesDetails should create SET_USER_TRIBES_DETAILS when fetching user's tribes' details has been done", async () => {
    const user = { id: 1234, name: "John Smith" };
    const data = [{ id: 1, name: "tribe1" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data });
    });

    const expectedActions = [
      {
        type: types.SET_USER_TRIBES_DETAILS,
        payload: data
      }
    ];

    await store.dispatch(actions.setUserTribesDetails(user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.users}/${user.id}/tribes`
    );
  });

  it("setUserEditingDetails should create SET_USER_EDITING_DETAILS when fetching details of tribes edited by user has been done", async () => {
    const user = { id: 1234, name: "John Smith" };
    const data = [{ id: 1, name: "tribe1" }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data });
    });

    const expectedActions = [
      {
        type: types.SET_USER_EDITING_DETAILS,
        payload: data
      }
    ];

    await store.dispatch(actions.setUserEditingDetails(user));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.users}/${user.id}/tribes?role=editor`
    );
  });
});

describe("actions", () => {
  it("setUser sholud create an action to set the user in store", () => {
    const user = { name: "John" };
    const expectedAction = {
      type: types.SET_USER,
      payload: user
    };
    expect(actions.setUser(user)).toEqual(expectedAction);
  });

  it("logout sholud call auth.logout and create an action with LOGOUT type", () => {
    auth.logout = jest.fn();
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
    expect(auth.logout).toHaveBeenCalledTimes(1);
  });

  it("setMenuOption sholud create an action to set a menu option", () => {
    const optionName = "home page";
    const expectedAction = {
      type: types.OPTION_SELECTED,
      payload: optionName
    };
    expect(actions.setMenuOption(optionName)).toEqual(expectedAction);
  });
});
