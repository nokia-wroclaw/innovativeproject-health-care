import reducer from "../tribes&teams";
import * as types from "../../actions/types";
import { getMockData } from "../mockDataForTests/tribesMockData";

let mockTribes, mockUsers, mockTeams, mockStructure;

describe("tribes reducer", () => {
  beforeEach(() => {
    [mockTribes, mockUsers, mockTeams, mockStructure] = getMockData();
  });
  //----------------------------------------------------------
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  //----------------------------------------------------------
  it("should handle SET_TRIBES", () => {
    expect(
      reducer([], {
        type: types.SET_TRIBES,
        payload: mockTribes
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle SET_TRIBE_EDITORS", () => {
    const tribe = mockTribes[0];
    expect(
      reducer(mockTribes, {
        type: types.SET_TRIBE_EDITORS,
        payload: { tribe, editors: mockUsers }
      })
    ).toEqual([
      {
        id: 1,
        name: "tribe 1",
        editors: [...mockUsers]
      },
      {
        id: 2,
        name: "tribe 2"
      }
    ]);

    expect(
      reducer([], {
        type: types.SET_TRIBE_EDITORS,
        payload: { tribe, editors: mockUsers }
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.SET_TRIBE_EDITORS,
        payload: {
          tribe: { id: 123, name: "not existing tribe" },
          editors: mockUsers
        }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle SET_TEAMS_IN_TRIBE", () => {
    const tribe = mockTribes[0];
    expect(
      reducer(mockTribes, {
        type: types.SET_TEAMS_IN_TRIBE,
        payload: { tribe, teams: mockTeams }
      })
    ).toEqual([
      {
        id: 1,
        name: "tribe 1",
        teams: [...mockTeams]
      },
      {
        id: 2,
        name: "tribe 2"
      }
    ]);

    expect(
      reducer([], {
        type: types.SET_TEAMS_IN_TRIBE,
        payload: { tribe, teams: mockTeams }
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.SET_TEAMS_IN_TRIBE,
        payload: {
          tribe: { id: 123, name: "not existing tribe" },
          teams: mockTeams
        }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle SET_TEAM_MANAGERS", () => {
    expect(
      reducer(mockStructure, {
        type: types.SET_TEAM_MANAGERS,
        payload: { team: mockTeams[0], managers: mockUsers }
      })
    ).toEqual([
      {
        id: 1,
        name: "tribe 1",
        teams: [
          {
            id: 1,
            name: "team 1",
            tribe_id: 1,
            managers: [...mockUsers]
          }
        ]
      },
      {
        id: 2,
        name: "tribe 2",
        teams: [
          {
            id: 2,
            name: "team 2",
            tribe_id: 2
          }
        ]
      }
    ]);

    expect(
      reducer([], {
        type: types.SET_TEAM_MANAGERS,
        payload: { team: mockTeams[0], managers: mockUsers }
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.SET_TEAM_MANAGERS,
        payload: {
          team: { id: 123, name: "not existing team" },
          managers: mockUsers
        }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle SET_TEAM_MEMBERS", () => {
    expect(
      reducer(mockStructure, {
        type: types.SET_TEAM_MEMBERS,
        payload: { team: mockTeams[0], members: mockUsers }
      })
    ).toEqual([
      {
        id: 1,
        name: "tribe 1",
        teams: [
          {
            id: 1,
            name: "team 1",
            tribe_id: 1,
            members: [...mockUsers]
          }
        ]
      },
      {
        id: 2,
        name: "tribe 2",
        teams: [
          {
            id: 2,
            name: "team 2",
            tribe_id: 2
          }
        ]
      }
    ]);

    expect(
      reducer([], {
        type: types.SET_TEAM_MEMBERS,
        payload: { team: mockTeams[0], members: mockUsers }
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.SET_TEAM_MEMBERS,
        payload: {
          team: { id: 123, name: "not existing team" },
          members: mockUsers
        }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle ADD_TRIBE", () => {
    const tribe = { id: 3, name: "tribe 3" };
    expect(
      reducer([...mockTribes], {
        type: types.ADD_TRIBE,
        payload: tribe
      })
    ).toEqual([...mockTribes, { ...tribe }]);

    expect(
      reducer([...mockTribes, { ...tribe }], {
        type: types.ADD_TRIBE,
        payload: tribe
      })
    ).toEqual([...mockTribes, { ...tribe }]);

    expect(
      reducer([], {
        type: types.ADD_TRIBE,
        payload: tribe
      })
    ).toEqual([{ ...tribe }]);
  });
  //----------------------------------------------------------
  it("should handle DELETE_TRIBE", () => {
    expect(
      reducer([...mockTribes], {
        type: types.DELETE_TRIBE,
        payload: mockTribes[0]
      })
    ).toEqual([
      {
        id: 2,
        name: "tribe 2"
      }
    ]);

    expect(
      reducer([], {
        type: types.DELETE_TRIBE,
        payload: mockTribes[0]
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.DELETE_TRIBE,
        payload: { id: 123, name: "not existing tribe" }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle UPDATE_TRIBE_NAME", () => {
    expect(
      reducer(mockTribes, {
        type: types.UPDATE_TRIBE_NAME,
        payload: { tribe: mockTribes[0], name: "new tribe 1" }
      })
    ).toEqual([
      {
        id: 1,
        name: "new tribe 1"
      },
      {
        id: 2,
        name: "tribe 2"
      }
    ]);

    expect(
      reducer([], {
        type: types.UPDATE_TRIBE_NAME,
        payload: { tribe: mockTribes[0], name: "new tribe 1" }
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.UPDATE_TRIBE_NAME,
        payload: {
          tribe: { id: 123, name: "not existing tribe" },
          name: "my tribe"
        }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle ADD_EDITOR_TO_TRIBE", () => {
    expect(
      reducer(mockTribes, {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: { tribe: mockTribes[0], editor: mockUsers[0] }
      })
    ).toEqual([
      {
        ...mockTribes[0],
        editors: [{ ...mockUsers[0] }]
      },
      {
        ...mockTribes[1]
      }
    ]);

    expect(
      reducer(mockTribes, {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: { tribe: mockTribes[0], editor: mockUsers[0] }
      })
    ).toEqual([
      {
        ...mockTribes[0],
        editors: [{ ...mockUsers[0] }]
      },
      {
        ...mockTribes[1]
      }
    ]);

    expect(
      reducer(mockTribes, {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: { tribe: mockTribes[0], editor: mockUsers[1] }
      })
    ).toEqual([
      {
        ...mockTribes[0],
        editors: [{ ...mockUsers[0] }, { ...mockUsers[1] }]
      },
      {
        ...mockTribes[1]
      }
    ]);

    expect(
      reducer([], {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: { tribe: mockTribes[0], editor: mockUsers[0] }
      })
    ).toEqual([]);

    expect(
      reducer(mockTribes, {
        type: types.ADD_EDITOR_TO_TRIBE,
        payload: {
          tribe: { id: 123, name: "not existing tribe" },
          editor: mockUsers[0]
        }
      })
    ).toEqual(mockTribes);
  });
  //----------------------------------------------------------
  it("should handle DELETE_EDITOR_FROM_TRIBE", () => {
    expect(
      reducer(
        [
          {
            ...mockTribes[0],
            editors: [...mockUsers]
          }
        ],
        {
          type: types.DELETE_EDITOR_FROM_TRIBE,
          payload: { tribe: mockTribes[0], editor: mockUsers[0] }
        }
      )
    ).toEqual([
      {
        ...mockTribes[0],
        editors: [{ ...mockUsers[1] }]
      }
    ]);

    expect(
      reducer([], {
        type: types.DELETE_EDITOR_FROM_TRIBE,
        payload: { tribe: mockTribes[0], editor: mockUsers[0] }
      })
    ).toEqual([]);

    expect(
      reducer([...mockTribes], {
        type: types.DELETE_EDITOR_FROM_TRIBE,
        payload: {
          tribe: { id: 123, name: "not existing tribe" },
          editor: mockUsers[0]
        }
      })
    ).toEqual([...mockTribes]);
  });
});
