import React, { forwardRef, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button, Grid, TextField } from "@material-ui/core";
import "moment";
import "moment/locale/es";
import Swal from "sweetalert2";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { uiCloseModal } from "../../actions/ui";
import {
  peopleClearActiveEvent,
  peopleStartAddNew,
  peopleStartUpdate,
} from "../../actions/people";

const useStyles = makeStyles({
  root: {
    minWidth: 240,
    marginTop: 10,
    marginRight: 2,
  },
  typography: {
    fontSize: 20,
    marginBottom: 20,
  },
  textfield: {
    marginBottom: 20,
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const now = moment();

const initPerson = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  rfc: "",
  fechaNacimiento: "",
  //fechaNacimiento: now.toDate(),
};

moment.locale("es");

export const ModalPeople = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { uid } = useSelector((state) => state.auth);
  const { activePerson } = useSelector((state) => state.people);

  const { root, textfield } = useStyles();

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initPerson);

  //const [fechaNacimiento, setSelectedDate] = useState(now.toDate());

  const {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    rfc,
    fechaNacimiento,
  } = formValues;

  useEffect(() => {
    if (activePerson) {
      setFormValues(activePerson);
    } else {
      setFormValues(initPerson);
    }
  }, [activePerson, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  /*const handleDateChange = (e) => {
    setSelectedDate(e);
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.trim().length <= 0 ||
      apellidoPaterno.trim().length <= 0 ||
      apellidoMaterno.trim().length <= 0 ||
      rfc.trim().length <= 0 ||
      fechaNacimiento.trim().length <= 0
    ) {
      handleCloseModal();
      return Swal.fire("Error", "Algunos campos estan vacios", "error");
    }
    if (rfc.trim().length !== 13) {
      handleCloseModal();
      return Swal.fire("Error", "El RFC es incorrecto", "error");
    }

    if (activePerson) {
      dispatch(
        peopleStartUpdate({
          idPersonaFisica: activePerson.IdPersonaFisica,
          ...formValues,
          usuarioAgrega: uid,
        })
      );
    } else {
      dispatch(
        peopleStartAddNew({
          ...formValues,
          usuarioAgrega: uid,
        })
      );
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(uiCloseModal());
    dispatch(peopleClearActiveEvent());
    setFormValues(initPerson);
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Registrar Persona Fisica"}
        </DialogTitle>
        <DialogContent>
          <Card className={root} variant="outlined">
            <CardContent>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <TextField
                    fullWidth
                    className={textfield}
                    label="Nombre"
                    variant="outlined"
                    name="nombre"
                    value={nombre}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    className={textfield}
                    label="Apellido Paterno"
                    variant="outlined"
                    name="apellidoPaterno"
                    value={apellidoPaterno}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    className={textfield}
                    label="Apellido materno"
                    variant="outlined"
                    name="apellidoMaterno"
                    value={apellidoMaterno}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    className={textfield}
                    label="RFC"
                    variant="outlined"
                    name="rfc"
                    value={rfc}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    type="date"
                    fullWidth
                    className={textfield}
                    label="Fecha de Nacimiento"
                    variant="outlined"
                    name="fechaNacimiento"
                    format="YYYY-MM-DD"
                    value={moment(fechaNacimiento).format('YYYY-MM-DD')}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Button
                  className={textfield}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Guardar
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
