import auth from "../authorization";

const user1 = {
  roles: ["user"]
};

const user2 = {
  roles: ["user", "manager", "editor", "admin"]
};

const user3 = {};

const user4 = {
  roles: []
};

describe('isAdmin should return true when given object has "roles" array property that includes "admin"', () => {
  it('should return false for object.roles = ["user"]', () => {
    expect(auth.isAdmin(user1)).toBe(false);
  });
  it('should return true for object.roles = ["user", "maneger", "editor", "admin"]', () => {
    expect(auth.isAdmin(user2)).toBe(true);
  });
  it("should return false for empty object", () => {
    expect(auth.isAdmin(user3)).toBe(false);
  });
  it("should return false for object.roles = []", () => {
    expect(auth.isAdmin(user4)).toBe(false);
  });
});

describe('isEditor should return true when given object has "roles" array property that includes "editor"', () => {
  it('should return false for object.roles = ["user"]', () => {
    expect(auth.isEditor(user1)).toBe(false);
  });
  it('should return true for object.roles = ["user", "maneger", "editor", "admin"]', () => {
    expect(auth.isEditor(user2)).toBe(true);
  });
  it("should return false for empty object", () => {
    expect(auth.isEditor(user3)).toBe(false);
  });
  it("should return false for object.roles = []", () => {
    expect(auth.isEditor(user4)).toBe(false);
  });
});

describe('isManager should return true when given object has "roles" array property that includes "manager"', () => {
  it('should return false for object.roles = ["user"]', () => {
    expect(auth.isManager(user1)).toBe(false);
  });
  it('should return true for object.roles = ["user", "maneger", "editor", "admin"]', () => {
    expect(auth.isManager(user2)).toBe(true);
  });
  it("should return false for empty object", () => {
    expect(auth.isManager(user3)).toBe(false);
  });
  it("should return false for object.roles = []", () => {
    expect(auth.isManager(user4)).toBe(false);
  });
});

describe('isUser should return true when given object has "roles" array property that includes "user"', () => {
  it('should return true for object.roles = ["user"]', () => {
    expect(auth.isUser(user1)).toBe(true);
  });
  it('should return true for object.roles = ["user", "maneger", "editor", "admin"]', () => {
    expect(auth.isUser(user2)).toBe(true);
  });
  it("should return false for empty object", () => {
    expect(auth.isUser(user3)).toBe(false);
  });
  it("should return false for object.roles = []", () => {
    expect(auth.isUser(user4)).toBe(false);
  });
});

describe("getMenu should return menu depending on user's role", () => {
  it('sholud return 4-element array for object.roles=["user"]', () => {
    expect(auth.getMenu(user1).length).toEqual(4);
  });
  it('sholud return 4-element array for object.roles=["manager"]', () => {
    expect(auth.getMenu({ roles: ["manager"] }).length).toEqual(4);
  });
  it('sholud return 3-element array for object.roles=["editor"]', () => {
    expect(auth.getMenu({ roles: ["editor"] }).length).toEqual(3);
  });
  it('sholud return 1-element array for object.roles=["admin"]', () => {
    expect(auth.getMenu({ roles: ["admin"] }).length).toEqual(1);
  });
  it('sholud return 8-element array for object.roles = ["user", "maneger", "editor", "admin"]', () => {
    expect(auth.getMenu(user2).length).toEqual(8);
  });
  it("sholud return empty array for empty object", () => {
    expect(auth.getMenu(user3).length).toEqual(0);
  });
  it('sholud return empty array for object.roles = []"', () => {
    expect(auth.getMenu(user4).length).toEqual(0);
  });
});
