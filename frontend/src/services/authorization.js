const userMenu = [
  { name: "Results for your tribe", path: "/tribe_overview" },
  { name: "Statistics", path: "/statistics" },
  { name: "Fill survey", path: "/fill_survey" },
  { name: "Action items", path: "/action_items" }
];

const managerMenu = [
  ...userMenu,
  { name: "Comments", path: "/users_comments" },
  { name: "Edit survey", path: "/edit_survey" }
];

const editorMenu = [
  ...managerMenu,
  { name: "Users management", path: "/users_management" }
];

const adminMenu = [
  ...editorMenu,
  { name: "Admin panel", path: "/admin_panel" }
];

const getMenu = user => {
  if (user.roles.includes("admin")) return adminMenu;
  if (user.roles.includes("editor")) return editorMenu;
  if (user.roles.includes("manager")) return managerMenu;
  return userMenu;
};

const isAdmin = user => {
  try {
    return user.roles.includes("admin");
  } catch {
    return false;
  }
};

const isEditor = user => {
  try {
    return user.roles.includes("editor");
  } catch {
    return false;
  }
};

const isManager = user => {
  try {
    return user.roles.includes("manager");
  } catch {
    return false;
  }
};

export const getJwt = () => localStorage.getItem("jwt");

export default {
  userMenu,
  getMenu,
  isAdmin,
  isEditor,
  isManager,
  getJwt
};
