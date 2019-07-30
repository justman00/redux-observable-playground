export const SET_CONFIG = "SET_CONFIG";

export function setConfig(partialObj) {
  return {
    type: SET_CONFIG,
    payload: partialObj
  };
}
