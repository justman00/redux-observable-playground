export const FETCH_FULLFIELD = "FETCH_FULLFIELD";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const FETCH_FAILED = "FETCH_FAILED";
export const CANCEL = "CANCEL";
export const RESET = "RESET";
export const RANDOM = "RANDOM";

export function fetchFullfield(beers) {
  return {
    type: FETCH_FULLFIELD,
    payload: beers
  };
}

export function setStatus(status) {
  return {
    type: SET_STATUS,
    payload: status
  };
}

export function fetchData() {
  return {
    type: FETCH_DATA
  };
}

export function cancel() {
  return {
    type: CANCEL
  };
}
export function reset() {
  return {
    type: RESET
  };
}

export function search(value) {
  return {
    type: SEARCH,
    payload: value
  };
}
export function random() {
  return {
    type: RANDOM
  };
}
export function fetchFailed(message) {
  return {
    type: FETCH_FAILED,
    payload: message
  };
}
