import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import PlusIcon from "@material-ui/icons/Add";
import EyeIcon from "@material-ui/icons/RemoveRedEyeRounded";
import EditIcon from "@material-ui/icons/Edit";
import ActiveIcon from "@material-ui/icons/Check";
import { Pagination } from "@material-ui/lab";

import { TitlePeople } from "../components/people/TitlePeople";
import { ModalPeople } from "../components/people/ModalPeople";
import {
  peopleClearActiveEvent,
  peopleSetActive,
  peopleStartDelete,
  peopleStartLoading,
} from "../actions/people";
import { uiOpenModal, uiOpenModalCheckData } from "../actions/ui";
import { ModalCheckDataPeople } from "../components/people/ModalCheckDataPeople";
import moment from "moment";

const useStylesPeople = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  no:{
    textDecoration: "line-through",
    color: 'red'
  }
}));

export const PeoplePage = () => {
  const classes = useStylesPeople();

  const dispatch = useDispatch();

  const { people, count } = useSelector((state) => state.people);

  const [page, setPage] = useState(1);

  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const handleSee = (person) => {
    dispatch(peopleSetActive(person));
    dispatch(uiOpenModalCheckData());
  };

  const handleEdit = (person) => {
    dispatch(peopleSetActive(person));
    dispatch(uiOpenModal());
  };

  const handleDelete = (person) => {
    dispatch(peopleSetActive(person));
    dispatch(peopleStartDelete());
    dispatch(peopleClearActiveEvent());
  };

  const handleOpenModal = () => {
    dispatch(uiOpenModal());
  };

  useEffect(() => {
    dispatch(peopleStartLoading(page));
  }, [dispatch, page]);


  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TitlePeople>Personas Fisicas</TitlePeople>
              <Grid
                item xs={12}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<PlusIcon />}
                  onClick={handleOpenModal}
                >
                  Agregar Persona Fisica
                </Button>
              </Grid>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>RFC</TableCell>
                    <TableCell>Nombre Completo</TableCell>
                    <TableCell>Fecha Nacimiento</TableCell>
                    <TableCell align="right">Visualizar</TableCell>
                    <TableCell align="right">Actualizar</TableCell>
                    <TableCell align="right">Eliminar / Activar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {people.map((person) => (
                    <TableRow className={(!person.activo) ? classes.no : ''} key={person.idPersonaFisica}>
                      <TableCell>{person.rfc}</TableCell>
                      <TableCell>{`${person.nombre
                        .toString()
                        .toUpperCase()} ${person.apellidoPaterno
                        .toString()
                        .toUpperCase()} ${person.apellidoMaterno
                        .toString()
                        .toUpperCase()}`}</TableCell>
                      <TableCell>{moment(person.fechaNacimiento).format('YYYY-MM-DD')}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<EyeIcon />}
                          onClick={() => {
                            handleSee(person);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="default"
                          className={classes.button}
                          startIcon={<EditIcon />}
                          onClick={() => {
                            handleEdit(person);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {person.activo ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              handleDelete(person);
                            }}
                          />
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<ActiveIcon />}
                            onClick={() => {
                              handleDelete(person);
                            }}
                            disabled
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Pagination
                  defaultPage={0}
                  count={Math.ceil(count/5)}
                  page={page}
                  color="primary"
                  onChange={handleChange}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <ModalPeople />
      <ModalCheckDataPeople />
    </main>
  );
};
