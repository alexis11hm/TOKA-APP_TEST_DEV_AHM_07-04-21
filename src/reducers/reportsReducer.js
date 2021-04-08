import { types } from "../types/types";

const initialState = {
  reports: [],
  auth: null
};

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.reportsLoaded:
      return {
        ...state,
        reports: [...action.payload],
      };
    case types.reportsAuthLogin:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};
