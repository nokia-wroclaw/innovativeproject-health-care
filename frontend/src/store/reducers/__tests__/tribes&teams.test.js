import reducer from "../tribes&teams";
import * as helpFunctions from "../tribes&teams";
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
  describe("should handle SET_TRIBES", () => {
    it("should set state to given payload", () => {
      expect(
        reducer([], {
          type: types.SET_TRIBES,
          payload: mockTribes
        })
      ).toEqual(mockTribes);
    });
  });
  //----------------------------------------------------------
  describe("should handle SET_TRIBE_EDITORS", () => {
    it("should find given tribe and add 'editors' field with given array of editors", () => {
      expect(
        reducer(mockTribes, {
          type: types.SET_TRIBE_EDITORS,
          payload: { tribe: mockTribes[0], editors: mockUsers }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          editors: [...mockUsers]
        },
        {
          ...mockTribes[1]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.SET_TRIBE_EDITORS,
          payload: { tribe: mockTribes[0], editors: mockUsers }
        })
      ).toEqual([]);
    });
    it("should do nothing when given tribe does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.SET_TRIBE_EDITORS,
          payload: {
            tribe: { id: 123, name: "not existing tribe" },
            editors: mockUsers
          }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle SET_TEAMS_IN_TRIBE", () => {
    it("should find given tribe and add 'teams' field with given array of teams", () => {
      expect(
        reducer(mockTribes, {
          type: types.SET_TEAMS_IN_TRIBE,
          payload: { tribe: mockTribes[0], teams: mockTeams }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [...mockTeams]
        },
        {
          ...mockTribes[1]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.SET_TEAMS_IN_TRIBE,
          payload: { tribe: mockTribes[0], teams: mockTeams }
        })
      ).toEqual([]);
    });
    it("should do nothing when given tribe does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.SET_TEAMS_IN_TRIBE,
          payload: {
            tribe: { id: 123, name: "not existing tribe" },
            teams: mockTeams
          }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle SET_TEAM_MANAGERS", () => {
    it("should find given team and add 'managers' field with given array of managers", () => {
      expect(
        reducer(mockStructure, {
          type: types.SET_TEAM_MANAGERS,
          payload: { team: mockTeams[0], managers: mockUsers }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              managers: [...mockUsers]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.SET_TEAM_MANAGERS,
          payload: { team: mockTeams[0], managers: mockUsers }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.SET_TEAM_MANAGERS,
          payload: {
            team: { id: 123, name: "not existing team" },
            managers: mockUsers
          }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle SET_TEAM_MEMBERS", () => {
    it("should find given team and add 'members' field with given array of members", () => {
      expect(
        reducer(mockStructure, {
          type: types.SET_TEAM_MEMBERS,
          payload: { team: mockTeams[0], members: mockUsers }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              members: [...mockUsers]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.SET_TEAM_MEMBERS,
          payload: { team: mockTeams[0], members: mockUsers }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.SET_TEAM_MEMBERS,
          payload: {
            team: { id: 123, name: "not existing team" },
            members: mockUsers
          }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle ADD_TRIBE", () => {
    const tribe = { id: 3, name: "tribe 3" };
    it("should add given tribe to tribes array", () => {
      expect(
        reducer([], {
          type: types.ADD_TRIBE,
          payload: tribe
        })
      ).toEqual([{ ...tribe }]);

      expect(
        reducer([...mockTribes], {
          type: types.ADD_TRIBE,
          payload: tribe
        })
      ).toEqual([...mockTribes, { ...tribe }]);
    });
    it("shouldn't add given tribe to tribes array if it's already there", () => {
      expect(
        reducer([...mockTribes, { ...tribe }], {
          type: types.ADD_TRIBE,
          payload: tribe
        })
      ).toEqual([...mockTribes, { ...tribe }]);
    });
  });
  //----------------------------------------------------------
  describe("should handle DELETE_TRIBE", () => {
    it("should delete given tribe from tribes array", () => {
      expect(
        reducer([...mockTribes], {
          type: types.DELETE_TRIBE,
          payload: mockTribes[0]
        })
      ).toEqual([{ ...mockTribes[1] }]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.DELETE_TRIBE,
          payload: mockTribes[0]
        })
      ).toEqual([]);
    });
    it("should do nothing when given tribe does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.DELETE_TRIBE,
          payload: { id: 123, name: "not existing tribe" }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle UPDATE_TRIBE_NAME", () => {
    it("should find given tribe and change it's name to given name", () => {
      expect(
        reducer(mockTribes, {
          type: types.UPDATE_TRIBE_NAME,
          payload: { tribe: mockTribes[0], name: "new tribe name" }
        })
      ).toEqual([
        {
          id: 1,
          name: "new tribe name"
        },
        { ...mockTribes[1] }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.UPDATE_TRIBE_NAME,
          payload: { tribe: mockTribes[0], name: "new tribe name" }
        })
      ).toEqual([]);
    });
    it("should do nothing when given tribe does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.UPDATE_TRIBE_NAME,
          payload: {
            tribe: { id: 123, name: "not existing tribe" },
            name: "my tribe"
          }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle ADD_EDITOR_TO_TRIBE", () => {
    it("should add given editor to given tribe if it's not already there", () => {
      // adding editor 0 when there are no editors in tribe 0
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

      // adding editor 0 to tribe 0 when it's already there
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

      // adding editor 1 to tribe 0 when there is one other editor
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
    });

    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.ADD_EDITOR_TO_TRIBE,
          payload: { tribe: mockTribes[0], editor: mockUsers[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given tribe does not exist", () => {
      expect(
        reducer([mockTribes], {
          type: types.ADD_EDITOR_TO_TRIBE,
          payload: {
            tribe: { id: 123, name: "not existing tribe" },
            editor: mockUsers[0]
          }
        })
      ).toEqual([mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle DELETE_EDITOR_FROM_TRIBE", () => {
    it("should find give tribe in tribes array and delete given editor from it's editors array", () => {
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
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.DELETE_EDITOR_FROM_TRIBE,
          payload: { tribe: mockTribes[0], editor: mockUsers[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given tribe does not exist", () => {
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
  //----------------------------------------------------------
  describe("should handle ADD_TEAM_TO_TRIBE", () => {
    it("should add given team to given tribe if it's not already there", () => {
      // adding team 0 when there are no teams in tribe 0
      expect(
        reducer(mockTribes, {
          type: types.ADD_TEAM_TO_TRIBE,
          payload: { tribe: mockTribes[0], team: mockTeams[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [{ ...mockTeams[0] }]
        },
        {
          ...mockTribes[1]
        }
      ]);

      // adding team 0 to tribe 0 when it's already there
      expect(
        reducer(mockTribes, {
          type: types.ADD_TEAM_TO_TRIBE,
          payload: { tribe: mockTribes[0], team: mockTeams[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [{ ...mockTeams[0] }]
        },
        {
          ...mockTribes[1]
        }
      ]);

      // adding team 1 to tribe 0 when there is one other team
      expect(
        reducer(mockTribes, {
          type: types.ADD_TEAM_TO_TRIBE,
          payload: { tribe: mockTribes[0], team: mockTeams[1] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [{ ...mockTeams[0] }, { ...mockTeams[1] }]
        },
        {
          ...mockTribes[1]
        }
      ]);
    });

    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.ADD_TEAM_TO_TRIBE,
          payload: { tribe: mockTribes[0], team: mockTeams[0] }
        })
      ).toEqual([]);
    });

    it("should do nothing when given tribe does not exist", () => {
      expect(
        reducer([...mockTribes], {
          type: types.ADD_TEAM_TO_TRIBE,
          payload: {
            tribe: { id: 123, name: "not existing tribe" },
            team: mockTeams[0]
          }
        })
      ).toEqual([...mockTribes]);
    });
  });
  //----------------------------------------------------------
  describe("should handle DELETE_TEAM", () => {
    it("should find given team in tribes array and set deleted on true", () => {
      expect(
        reducer([...mockStructure], {
          type: types.DELETE_TEAM,
          payload: { team: mockTeams[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [{
            id: 1,
            name: "team 1",
            tribe_id: 1,
            deleted: true,
            deleted_at: null
          }]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.DELETE_TEAM,
          payload: { team: mockTeams[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockStructure], {
          type: types.DELETE_TEAM,
          payload: { team: { id: 3, name: "not existing name" } }
        })
      ).toEqual([...mockStructure]);
    });
  });
  //----------------------------------------------------------
  describe("should handle UPDATE_TEAM_NAME", () => {
    it("should find given team and change it's name to given name", () => {
      expect(
        reducer(mockStructure, {
          type: types.UPDATE_TEAM_NAME,
          payload: { team: mockTeams[0], name: "new team name" }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              id: 1,
              name: "new team name",
              tribe_id: 1,
              deleted: false,
              deleted_at: null
            }
          ]
        },
        { ...mockTribes[1], teams: [{ ...mockTeams[1] }] }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.UPDATE_TEAM_NAME,
          payload: { team: mockTeams[0], name: "new team name" }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockStructure], {
          type: types.UPDATE_TEAM_NAME,
          payload: {
            team: { id: 123, name: "not existing team" },
            name: "my team"
          }
        })
      ).toEqual([...mockStructure]);
    });
  });
  //----------------------------------------------------------
  describe("should handle ADD_MANAGER_TO_TEAM", () => {
    it("should add given user to given team's managers array if it's not already there", () => {
      // adding user 0 when there are no managers in team 0
      expect(
        reducer(mockStructure, {
          type: types.ADD_MANAGER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              managers: [{ ...mockUsers[0] }]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);

      // adding user 0 to team 0 managers when it's already there
      expect(
        reducer(mockStructure, {
          type: types.ADD_MANAGER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              managers: [{ ...mockUsers[0] }]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);

      // adding user 1 to team 0 managers when there is one other manager
      expect(
        reducer(mockStructure, {
          type: types.ADD_MANAGER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[1] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              managers: [{ ...mockUsers[0] }, { ...mockUsers[1] }]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });

    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.ADD_MANAGER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockStructure], {
          type: types.ADD_MANAGER_TO_TEAM,
          payload: {
            team: { id: 3, name: "not existing team" },
            user: mockUsers[0]
          }
        })
      ).toEqual([...mockStructure]);
    });
  });
  //----------------------------------------------------------
  describe("should handle DELETE_MANAGER_FROM_TEAM", () => {
    it("should find given team in tribes array and delete given user from it's managers array", () => {
      expect(
        reducer(
          [
            {
              ...mockTribes[0],
              teams: [
                {
                  ...mockTeams[0],
                  managers: [{ ...mockUsers[0] }]
                }
              ]
            },
            {
              ...mockTribes[1],
              teams: [{ ...mockTeams[1] }]
            }
          ],
          {
            type: types.DELETE_MANAGER_FROM_TEAM,
            payload: { team: mockTeams[0], user: mockUsers[0] }
          }
        )
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              managers: []
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.DELETE_MANAGER_FROM_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockStructure], {
          type: types.DELETE_MANAGER_FROM_TEAM,
          payload: {
            team: { id: 3, name: "not existing name" },
            user: mockUsers[0]
          }
        })
      ).toEqual([...mockStructure]);
    });
  });
  //----------------------------------------------------------
  describe("should handle ADD_MEMBER_TO_TEAM", () => {
    it("should add given user to given team's members array if it's not already there", () => {
      // adding user 0 when there are no members in team 0
      expect(
        reducer(mockStructure, {
          type: types.ADD_MEMBER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              members: [{ ...mockUsers[0] }]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);

      // adding user 0 to team 0 members when it's already there
      expect(
        reducer(mockStructure, {
          type: types.ADD_MEMBER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              members: [{ ...mockUsers[0] }]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);

      // adding user 1 to team 0 members when there is one other member
      expect(
        reducer(mockStructure, {
          type: types.ADD_MEMBER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[1] }
        })
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              members: [{ ...mockUsers[0] }, { ...mockUsers[1] }]
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });

    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.ADD_MEMBER_TO_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockStructure], {
          type: types.ADD_MEMBER_TO_TEAM,
          payload: {
            team: { id: 3, name: "not existing team" },
            user: mockUsers[0]
          }
        })
      ).toEqual([...mockStructure]);
    });
  });
  //----------------------------------------------------------
  describe("should handle DELETE_MEMBER_FROM_TEAM", () => {
    it("should find given team in tribes array and delete given user from it's members array", () => {
      expect(
        reducer(
          [
            {
              ...mockTribes[0],
              teams: [
                {
                  ...mockTeams[0],
                  members: [{ ...mockUsers[0] }]
                }
              ]
            },
            {
              ...mockTribes[1],
              teams: [{ ...mockTeams[1] }]
            }
          ],
          {
            type: types.DELETE_MEMBER_FROM_TEAM,
            payload: { team: mockTeams[0], user: mockUsers[0] }
          }
        )
      ).toEqual([
        {
          ...mockTribes[0],
          teams: [
            {
              ...mockTeams[0],
              members: []
            }
          ]
        },
        {
          ...mockTribes[1],
          teams: [{ ...mockTeams[1] }]
        }
      ]);
    });
    it("should do nothing when there are no tribes", () => {
      expect(
        reducer([], {
          type: types.DELETE_MEMBER_FROM_TEAM,
          payload: { team: mockTeams[0], user: mockUsers[0] }
        })
      ).toEqual([]);
    });
    it("should do nothing when given team does not exist", () => {
      expect(
        reducer([...mockStructure], {
          type: types.DELETE_MEMBER_FROM_TEAM,
          payload: {
            team: { id: 3, name: "not existing name" },
            user: mockUsers[0]
          }
        })
      ).toEqual([...mockStructure]);
    });
  });
});
//----------------------------------------------------------
describe("should handle RESTORE_TEAM", () => {
  it("should find given team in tribes array and set deleted on flase", () => {
    expect(
      reducer([...mockStructure], {
        type: types.RESTORE_TEAM,
        payload: { team: mockTeams[0] }
      })
    ).toEqual([
      {
        ...mockTribes[0],
        teams: [{ ...mockTeams[0] }]
      },
      {
        ...mockTribes[1],
        teams: [{ ...mockTeams[1] }]
      }
    ]);
  });
  it("should do nothing when there are no tribes", () => {
    expect(
      reducer([], {
        type: types.RESTORE_TEAM,
        payload: { team: mockTeams[0] }
      })
    ).toEqual([]);
  });
  it("should do nothing when given team does not exist", () => {
    expect(
      reducer([...mockStructure], {
        type: types.RESTORE_TEAM,
        payload: { team: { id: 3, name: "not existing name" } }
      })
    ).toEqual([...mockStructure]);
  });
});
//----------------------------------------------------------

describe("help functions", () => {
  beforeEach(() => {
    [mockTribes, mockUsers, mockTeams, mockStructure] = getMockData();
  });

  describe("findTribe", () => {
    it("should search in given array for given object by it's id field", () => {
      expect(helpFunctions.findTribe(mockTribes, mockTribes[0])).toEqual(
        mockTribes[0]
      );
      expect(
        helpFunctions.findTribe(mockTribes, {
          id: 123,
          name: "not existing tribe"
        })
      ).toBeFalsy();
      expect(
        helpFunctions.findTribe(mockTribes, { name: "tribe without id" })
      ).toBeFalsy();
      expect(
        helpFunctions.findTribe("not an array", mockTribes[0])
      ).toBeFalsy();
    });
  });

  describe("findTeam", () => {
    it("should search in given array of tribes for given team by it's tribe_id and id fields", () => {
      expect(helpFunctions.findTeam(mockStructure, mockTeams[0])).toEqual(
        mockTeams[0]
      );
      expect(
        helpFunctions.findTeam(mockStructure, {
          id: 123,
          name: "not existing team"
        })
      ).toBeFalsy();
      expect(
        helpFunctions.findTeam(mockStructure, {
          tribe_id: 1,
          name: "team without id"
        })
      ).toBeFalsy();
      expect(
        helpFunctions.findTeam(mockStructure, {
          id: 1,
          name: "team without tribe_id"
        })
      ).toBeFalsy();
      expect(helpFunctions.findTeam("not an array", mockTeams[0])).toBeFalsy();
    });
  });

  describe("includesObjectWithId", () => {
    it("should check if given array includes object with id the same as id of given object", () => {
      expect(
        helpFunctions.includesObjectWithId(mockTribes, mockTribes[0])
      ).toBeTruthy();
      expect(
        helpFunctions.includesObjectWithId(mockTribes, {
          id: 123,
          name: "not existing tribe"
        })
      ).toBeFalsy();
      expect(
        helpFunctions.includesObjectWithId(mockTribes, {
          name: "tribe without id"
        })
      ).toBeFalsy();
      expect(
        helpFunctions.includesObjectWithId("not an array", mockTribes[0])
      ).toBeFalsy();
    });
  });

  describe("uniquePush", () => {
    it("should push given object to given array if includesObjectWithId(array, object) returns false", () => {
      expect(mockTribes.length).toBe(2);
      helpFunctions.uniquePush(mockTribes, mockTribes[0]);
      expect(mockTribes.length).toBe(2);
      helpFunctions.uniquePush(mockTribes, {
        id: 123,
        name: "not existing tribe"
      });
      expect(mockTribes.length).toBe(3);
    });
  });
});
