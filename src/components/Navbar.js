import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitIcon from "@material-ui/icons/ExitToAppRounded";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  link: {
    marginRight: 20,
    color: "White",
    textDecoration: "none",
  },
}));

export const Navbar = () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Prueba Tecnica
          </Typography>

          <Typography component="h1" variant="h6" color="inherit" noWrap>
            <Link className={classes.link} to="/">
              Personas Fisicas
            </Link>
          </Typography>

          <Typography component="h1" variant="h6" color="inherit" noWrap>
            <Link className={classes.link} to="/reports">
              Reportes
            </Link>
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
