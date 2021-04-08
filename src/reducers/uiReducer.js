import { types } from "../types/types";

const initialState = {
  modalOpen: false,
  modalOpenCheckData: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    case types.uiOpenModalCheckData:
      return {
        ...state,
        modalOpenCheckData: true,
      };
    case types.uiCloseModalCheckData:
      return {
        ...state,
        modalOpenCheckData: false,
      };
    default:
      return state;
  }
};
