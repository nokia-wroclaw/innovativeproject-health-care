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

export const replaceNotLettersWithSpace = text => {
  const notLetters = /[^A-Za-z]/g;
  return text.replace(notLetters, " ");
};

export const replaceSpaceWithUnderscore = text => {
  return text.replace(/\s/g, "_");
};

export const removeSpaceAtBegening = text => {
  return text.replace(/^\s+/g, "");
};
