import {
  FETCH_FULLFIELD,
  SET_STATUS,
  FETCH_FAILED,
  RESET
} from "../actions/beersActions";

const initialState = {
  data: [],
  status: "idle",
  messages: []
};

export function beersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case RESET:
      return {
        ...state,
        status: "idle",
        messages: []
      };
    case FETCH_FULLFIELD:
      return {
        ...state,
        status: "success",
        data: action.payload,
        messages: []
      };
    case FETCH_FAILED:
      return {
        ...state,
        status: "failure",
        messages: [
          {
            type: "error",
            text: action.payload
          }
        ]
      };

    default:
      return state;
  }
}
