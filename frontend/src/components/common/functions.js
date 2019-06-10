export const confirmDialog = (itemName, customMessage) => {
  const defaultMsg = itemName
    ? `Are you sure you want to delete ${itemName}?`
    : `Are you sure you want to delete this item?`;
  const msg = customMessage || defaultMsg;
  return window.confirm(msg);
};

export const isAsync = fn => {
  return fn.constructor.name === "AsyncFunction";
};
