export const getMockData = () => {
  let mockTribes, mockUsers, mockTeams, mockStructure;
  mockTribes = [
    {
      id: 1,
      name: "tribe 1"
    },
    {
      id: 2,
      name: "tribe 2"
    }
  ];
  mockUsers = [
    {
      id: 1,
      name: "John Smith"
    },
    {
      id: 2,
      name: "Anna Smith"
    }
  ];
  mockTeams = [
    {
      id: 1,
      name: "team 1",
      tribe_id: 1
    },
    {
      id: 2,
      name: "team 2",
      tribe_id: 2
    }
  ];
  mockStructure = [
    {
      id: 1,
      name: "tribe 1",
      teams: [
        {
          id: 1,
          name: "team 1",
          tribe_id: 1
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
  ];
  return [mockTribes, mockUsers, mockTeams, mockStructure];
};

export default getMockData;
