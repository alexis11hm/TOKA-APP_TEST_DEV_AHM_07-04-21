import Swal from "sweetalert2";

import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const peopleStartAddNew = (people) => {
  return async (dispatch, getState) => {
    try {
      const resp = await fetchConToken("PersonasFisicas/Crear", people, "POST");
      const body = await resp.json();

      if (body.nombre) {
        dispatch(peopleAddNew(body));
        Swal.fire("Aviso", "Personas registrada correctamente", "success");
      }
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const peopleAddNew = (people) => ({
  type: types.peopleAddNew,
  payload: people,
});

export const peopleSetActive = (person) => ({
  type: types.peopleSetActive,
  payload: person,
});

export const peopleClearActiveEvent = () => ({
  type: types.peopleClearActiveEvent,
});

export const peopleStartUpdate = (people) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `PersonasFisicas/Actualizar/${people.idPersonaFisica}`,
        people,
        "PUT"
      );

      dispatch(peopleUpdated(people));
      Swal.fire("Aviso", "Persona actualizada correctamente", "success");
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

export const peopleUpdated = (people) => ({
  type: types.peopleUpdated,
  payload: people,
});

export const peopleStartDelete = () => {
  return async (dispatch, getState) => {
    const { idPersonaFisica } = getState().people.activePerson;

    try {
      await fetchConToken(
        `PersonasFisicas/Eliminar/${idPersonaFisica}`,
        {},
        "DELETE"
      );

      dispatch(peopleDeleted());
      Swal.fire("Aviso", "La persona ha quedado inactiva", "success");

    } catch (error) {
      Swal.fire("Aviso", "La persona ha quedado inactiva", "success");
    }
  };
};

const peopleDeleted = () => ({ type: types.peopleDeleted });

export const peopleStartLoading = (numberPage) => {
  return async (dispatch) => {
    try {
      const respPeople = await fetchConToken("PersonasFisicas/Listar");
      const bodyPeople = await respPeople.json();

      const count = Array.from(bodyPeople).length;

      const resp = await fetchConToken(
        `PersonasFisicas/Paginar/${numberPage}/5`
      );
      const body = await resp.json();

      dispatch(peopleLoaded({ body, count }));
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
};

const peopleLoaded = (people) => ({
  type: types.peopleLoaded,
  payload: people,
});

export const peopleLogout = () => ({ type: types.peopleLogout });
