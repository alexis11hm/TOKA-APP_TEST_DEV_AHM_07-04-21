import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/CreditCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { reportsStartLogin, startLogin } from "../actions/auth";
import { reportsStartLoading } from "../actions/reports";

const useStylesLogin = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginPage = () => {

  const dispatch = useDispatch();

  const {paper, avatar, form, submit} = useStylesLogin();

  const [formLoginValues, handleLoginInputChange] = useForm({
    email: 'toka@gmail.com',
    password: 'toka'
  })

  const {email, password} = formLoginValues

  const handleLogin = (e) => {
    e.preventDefault();
    
    dispatch(startLogin(email, password));
    //dispatch(reportsStartLogin('ucand0021','yNDVARG80sr@dDPc2yCT!'))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={paper}>
        <Avatar className={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            value={email}
            onChange={handleLoginInputChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            onChange={handleLoginInputChange}
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submit}
          >
            Iniciar Sesiòn
          </Button>
        </form>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
};

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Todos los Derechos Reservados © "}
      <Link color="inherit" href="https://toka.com.mx/">
        Toka Internacional
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
