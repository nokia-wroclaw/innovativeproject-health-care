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
