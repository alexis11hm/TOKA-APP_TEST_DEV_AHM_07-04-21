import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { CSVLink } from "react-csv";

import { TitlePeople } from "../components/people/TitlePeople";
import { rows } from "../helpers/reportsData";

const useStylesReport = makeStyles((theme) => ({
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
  csv:{
    textDecoration: 'none',
    color: 'white',
  },
  button: {
    marginBottom: 20
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const columns = [
  { field: "rfc", headerName: "RFC", width: 190 },
  { field: "nombre", headerName: "Nombre", width: 190 },
  { field: "paterno", headerName: "Apellido Paterno", width: 190 },
  { field: "materno", headerName: "Apellido Materno", width: 190 },
  {
    field: "razonSocial",
    headerName: "Razon Social",
    width: 190 /*description: 'Teee...' */,
  },
  { field: "sucursal", headerName: "Sucursal", width: 190 },
];

export const ReportPage = () => {
  const classes = useStylesReport();

  const getHeadersColumns = (data) => {
    const columns = Object.keys(data[0]);
    let headers = [];
    columns.forEach((column) => {
      headers = [...headers, { label: column.toUpperCase(), key: column }];
    });
    return headers;
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TitlePeople>Reportes</TitlePeople>
              <Grid
              item
                xs={12}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Button className={classes.button} variant="contained" color="primary">
                  <CSVLink
                  className={classes.csv}
                    data={rows}
                    headers={getHeadersColumns(rows)}
                    filename={"reportes.csv"}
                  >
                    Importar a Excel
                  </CSVLink>
                </Button>
              </Grid>
              <Grid
              item
                xs={12}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={20}
                    checkboxSelection
                  />
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
