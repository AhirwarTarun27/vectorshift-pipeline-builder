const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

export const parseVariables = (text) => {
  if (typeof text !== "string" || !text) return [];

  const names = new Set();
  for (const match of text.matchAll(VARIABLE_PATTERN)) {
    names.add(match[1]);
  }
  return [...names];
};
