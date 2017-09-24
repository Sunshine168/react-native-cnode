export const createActionSet = actionName => ({
  REQUEST: `${actionName}_REQUEST`,
  PENDING: `${actionName}_PENDING`,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
});


export const createActionScreen = actionName =>({
    TOPIC: `${actionName}_TOPIC`,
    TOPIC_POST: `${actionName}_TOPIC_POST`,
    NOTIFICATION:`${actionName}_NOTIFICATION`,
    PERSONAL:`${actionName}_PERSONAL`,
})