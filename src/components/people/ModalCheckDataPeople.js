import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModalCheckData } from "../../actions/ui";
import { peopleClearActiveEvent } from "../../actions/people";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const ModalCheckDataPeople = () => {
  const { modalOpenCheckData } = useSelector((state) => state.ui);
  const { activePerson } = useSelector((state) => state.people);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(uiCloseModalCheckData());
    dispatch(peopleClearActiveEvent());
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalOpenCheckData}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {activePerson
            ? `${
                activePerson.rfc
              } - ${activePerson.nombre
                .toString()
                .toUpperCase()} ${activePerson.apellidoPaterno
                .toString()
                .toUpperCase()} ${activePerson.apellidoMaterno
                .toString()
                .toUpperCase()}`
            : ""}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Nombre Completo:</b>{" "}
            {activePerson
              ? `${activePerson.nombre
                  .toString()
                  .toUpperCase()} ${activePerson.apellidoPaterno
                  .toString()
                  .toUpperCase()} ${activePerson.apellidoMaterno
                  .toString()
                  .toUpperCase()}`
              : ""}
          </Typography>
          <Typography gutterBottom>
            <b>RFC:</b>{" "}
            {activePerson ? activePerson.rfc.toString().toUpperCase() : ""}
          </Typography>
          <Typography gutterBottom>
            <b>Fecha de Nacimiento:</b>{" "}
            {activePerson
              ? activePerson.fechaNacimiento.toString().toUpperCase()
              : ""}
          </Typography>
          <Typography gutterBottom>
            <b>Fecha de Registro:</b>{" "}
            {activePerson
              ? activePerson.fechaNacimiento.toString().toUpperCase()
              : ""}
          </Typography>
          <Typography gutterBottom>
            <b>Estatus:</b>{" "}
            {activePerson ? (activePerson.activo ? "ACTIVO" : "INACTIVO") : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
