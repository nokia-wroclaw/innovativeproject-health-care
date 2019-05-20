import _ from 'lodash';

const userMenu = [
  { name: 'Results', path: '/tribe_overview' },
  { name: 'Statistics', path: '/statistics' },
  { name: 'Fill survey', path: '/fill_survey' },
  { name: 'Action items', path: '/action_items' }
];

const managerMenu = [
  { name: 'Results for your tribe', path: '/tribe_overview' },
  { name: 'Statistics', path: '/statistics' },
  { name: 'Comments', path: '/users_comments' }
];

const editorMenu = [
  { name: 'Edit survey', path: '/edit_survey' },
  { name: 'Tribes management', path: '/tribes_management' },
  { name: 'Results', path: '/tribe_overview' },
  { name: 'Statistics', path: '/statistics' }
];

const adminMenu = [
  { name: 'Admin panel', path: '/admin_panel' },
  { name: 'Tribes management', path: '/tribes_management' }
];

export const getMenu = user => {
  let menu = [];
  try {
    if (user.roles.includes('user')) menu = [...menu, ...userMenu];
    if (user.roles.includes('manager')) menu = [...menu, ...managerMenu];
    if (user.roles.includes('editor')) menu = [...menu, ...editorMenu];
    if (user.roles.includes('admin')) menu = [...menu, ...adminMenu];
  } catch {}
  return _.uniqBy(menu, 'path');
};

export const isAdmin = user => {
  try {
    return user.roles.includes('admin');
  } catch {
    return false;
  }
};

export const isEditor = user => {
  try {
    return user.roles.includes('editor');
  } catch {
    return false;
  }
};

export const isManager = user => {
  try {
    return user.roles.includes('manager');
  } catch {
    return false;
  }
};

export const isUser = user => {
  try {
    return user.roles.includes('user');
  } catch {
    return false;
  }
};

export const getJwt = () => localStorage.getItem('token');

export default {
  userMenu,
  getMenu,
  isAdmin,
  isEditor,
  isManager,
  isUser,
  getJwt
};
