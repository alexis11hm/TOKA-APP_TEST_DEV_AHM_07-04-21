import { types } from "../types/types";

const initialState = {
  count: 0,
  people: [],
  activePerson: null,
};

export const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.peopleLoaded:
      return {
        ...state,
        people: [...action.payload.body],
        count: action.payload.count
      };
    case types.peopleSetActive:
      return {
        ...state,
        activePerson: action.payload,
      };
    case types.peopleClearActiveEvent:
      return {
        ...state,
        activePerson: null,
      };
    case types.peopleAddNew:
      return {
        ...state,
        people: [...state.people, action.payload],
      };
    case types.peopleDeleted:
      return {
        ...state,
        people: state.people.filter(
          (e) => e.id !== state.activePerson.idPersonaFisica
        ),
        activePerson: null,
      };
    case types.peopleLogout:
      return {
        ...initialState,
      };
    case types.peopleUpdated:
      return {
        ...state,
        people: state.people.map((e) =>
          e.id === action.payload.idPersonaFisica ? action.payload : e
        ),
      };
    default:
      return state;
  }
};
