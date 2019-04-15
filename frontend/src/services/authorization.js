const userMenu = [
  { name: "Results for your tribe", path: "/tribe_overview" },
  { name: "Statistics", path: "/statistics" },
  { name: "Fill survey", path: "/fill_survey" },
  { name: "Action items", path: "/action_items" }
];

const managerMenu = [
  //...userMenu,
  { name: "Comments", path: "/users_comments" },
  { name: "Edit survey", path: "/edit_survey" }
];

const editorMenu = [
  //...managerMenu,
  { name: "Users management", path: "/users_management" }
];

const adminMenu = [
  // ...editorMenu,
  { name: "Admin panel", path: "/admin_panel" }
];

const getMenu = user => {
  let menu = [];
  try {
    if (user.roles.includes("user")) menu = [...menu, ...userMenu];
    if (user.roles.includes("manager")) menu = [...menu, ...managerMenu];
    if (user.roles.includes("editor")) menu = [...menu, ...editorMenu];
    if (user.roles.includes("admin")) menu = [...menu, ...adminMenu];
  } catch {}
  return menu;
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

const isUser = user => {
  try {
    return user.roles.includes("user");
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
  isUser,
  getJwt
};
