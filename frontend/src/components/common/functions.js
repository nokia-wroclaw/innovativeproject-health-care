export const confirmDelete = (itemName, customMessage) => {
  const defaultMsg = itemName
    ? `Are you sure you want to remove ${itemName}?`
    : `Are you sure you want to remove this item?`;
  const msg = customMessage || defaultMsg;
  return window.confirm(msg);
};

export const isAsync = fn => {
  return fn.constructor.name === "AsyncFunction";
};
