import mockAxios from "axios";
import confiureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./../results";
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

  it("setTeamAnswers should create SET_TEAM_ANSWERS when fetching team's answers has been done", async () => {
    const team = { id: 123, name: "team1" };
    const answers = [{ id: 1, answer: 1 }, { id: 2, answer: 0 }];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: answers });
    });
    const expectedActions = [
      {
        type: types.SET_TEAM_ANSWERS,
        payload: answers
      }
    ];

    await store.dispatch(actions.setTeamAnswers(team.id));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.results}?type=team&teamid=${team.id}`
    );
  });

  it("setTribeMatrix should create RESET_TRIBE_MATRIX and SET_TRIBE_MATRIX when fetching tribe's matrix has been done", async () => {
    const tribe = { id: 123, name: "tribe1" };
    const period = { id: 1234 };
    const matrix = [[0, 1, 2], [2, 1, 0]];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: matrix });
    });
    const expectedActions = [
      { type: types.RESET_TRIBE_MATRIX },
      {
        type: types.SET_TRIBE_MATRIX,
        payload: matrix
      }
    ];

    await store.dispatch(actions.setTribeMatrix(tribe.id, period.id));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.results}?type=tribematrix&tribeid=${tribe.id}&period=${
        period.id
      }`
    );
  });

  it("setTribeMatrix should work when period id is not specified", async () => {
    const tribe = { id: 123, name: "tribe1" };
    const matrix = [[0, 1, 2], [2, 1, 0]];
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data: matrix });
    });
    const expectedActions = [
      { type: types.RESET_TRIBE_MATRIX },
      {
        type: types.SET_TRIBE_MATRIX,
        payload: matrix
      }
    ];

    await store.dispatch(actions.setTribeMatrix(tribe.id));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.results}?type=tribematrix&tribeid=${tribe.id}`
    );
  });

  it("setTribeHistory should create SET_TRIBE_HISTORY when fetching tribe's history has been done", async () => {
    const tribe = { id: 123, name: "tribe1" };
    const periodsNum = 5;
    const data = { some: "data" };
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data });
    });
    const expectedActions = [
      {
        type: types.SET_TRIBE_HISTORY,
        payload: data
      }
    ];

    await store.dispatch(actions.setTribeHistory(tribe.id, periodsNum));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.results}?type=tribehistory&tribeid=${
        tribe.id
      }&periods=${periodsNum}`
    );
  });

  it("setTribePeriods should create SET_TRIBE_PERIODS when fetching tribe's periods has been done", async () => {
    const tribe = { id: 123, name: "tribe1" };
    const data = { some: "data" };
    mockAxios.get.mockImplementationOnce(() => {
      httpCallCount.get++;
      return Promise.resolve({ data });
    });
    const expectedActions = [
      {
        type: types.SET_TRIBE_PERIODS,
        payload: data
      }
    ];

    await store.dispatch(actions.setTribePeriods(tribe.id));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(httpCallCount.get);
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      `${endpoints.tribes}/${tribe.id}/periods`
    );
  });
});
