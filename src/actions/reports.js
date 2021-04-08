import Swal from "sweetalert2"
import { fetchConTokenToka } from "../helpers/fetch";

import { types } from "../types/types";

export const reportsStartLoading = () => {
    return async (dispatch) => {
      try {
        const resp = await fetchConTokenToka('customers');
        const body = await resp.json();
  
        dispatch(reportsLoaded(body));
      } catch (error) {
        console.log(error)
      }
    };
  };
  
  const reportsLoaded = (reports) => ({
    type: types.reportsLoaded,
    payload: reports,
  });