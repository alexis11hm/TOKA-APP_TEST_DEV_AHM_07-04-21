import Swal from "sweetalert2"

import { fetchSinToken, fetchSinTokenToka } from "../helpers/fetch";
import { types } from "../types/types";
import { peopleLogout } from "./people";

export const startLogin = (email, clave) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "Login/IniciarSesion",
      { email, clave },
      "POST"
    );
    const body = await resp.json();

    if (body.token) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-data", new Date().getTime());
      localStorage.setItem("email", email);
      localStorage.setItem("key", clave);

      dispatch(login({ uid: body.id, name: body.nombre }));
      Swal.fire('Bienvenido','Has ingresado correctamente','success')
    } else {
      Swal.fire('Error',body.message,'error')
    }
  };
};

const login = (user) => ({ type: types.authLogin, payload: user });

export const reportsStartLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinTokenToka(
        "login/authenticate",
        { Username: username, Password: password },
        "POST"
      );
      const body = await resp.json();
      if (body.data) {
        localStorage.setItem("tokenToka", body.data);
        localStorage.setItem("token-init-data-toka", new Date().getTime());

        dispatch(reportsLogin({ username, password }));
      }
    } catch (error) {
      console.log(error)
    }
  };
};

const reportsLogin = (user) => ({
  type: types.reportsAuthLogin,
  payload: user,
});

export const startChecking = (email, clave) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "Login/IniciarSesion",
      { email, clave },
      "POST"
    );
    const body = await resp.json();

    if (body.token) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-data", new Date().getTime());
      localStorage.setItem("email", email);
      localStorage.setItem("key", clave);

      dispatch(login({ uid: body.id, name: body.nombre }));
    } else {
      dispatch(finishChecking());
      console.log(body.message);
    }
  };
};

const finishChecking = () => ({ type: types.authChekingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(peopleLogout());
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
