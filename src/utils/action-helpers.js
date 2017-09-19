export const createActionSet = actionName => ({
  REQUEST: `${actionName}_REQUEST`,
  PENDING: `${actionName}_PENDING`,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});
