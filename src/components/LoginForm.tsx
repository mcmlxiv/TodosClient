import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { getAccessToken, login } from "../api/auth";
import { loadAllUsers } from "../api/requests";
import { loginProps } from "../types.model";

const Copyright = () => {
  return (
    <Container style={{ margin: "2rem auto" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright ©  Remember To Do! "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperContainer: {
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    padding: 20,
    height: "65vh",
    width: "30vw",
    margin: "8rem auto",

    [theme.breakpoints.down("md")]: {
      height: "100%",
      width: "100%",
      margin: "1rem auto",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    textColor: `${theme.palette.type === "dark" ? "white" : "grey"}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  userControls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const LoginForm: React.FC<loginProps> = ({ onLogin, onUserLogin }) => {
  //refs for text fields
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  //States for triggering error validation from mUI text fields
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailValidate, setErrorEmailValidate] = useState(false);

  let history = useHistory();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    //Set email and pass err to false to reset component states after every error
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorEmailValidate(false);

    //capture values from input boxes
    const enteredEmail = email.current!.value;
    const enteredPass = password.current!.value;

    //
    (async () => {
      //load all users from the DB
      const usersQuery = await loadAllUsers();
      //Find if user email already exists in the DB
      const userExists = usersQuery.find(
        (user: any) => user.email === enteredEmail
      );

      //if userExists trigger UI error Email already exists
      if (!userExists) {
        setErrorEmailValidate(true);
      } else {
        login(enteredEmail, enteredPass).then((response) => {
          if (response.statusText === "OK") {
            //On correct credentials login
            //localStorage.setItem(userKey, userExists.id);
            onUserLogin(userExists.id);
            onLogin();
            history.push("/");
          } else {
            //Access Local storage and find accessToken
            getAccessToken();

            if (getAccessToken() === "case 1") {
              //Email verification through LS
              return setErrorEmail(true);
            } else {
              //Password verification through Local storage
              return setErrorPassword(true);
            }
          }
        });
      }
    })();
  };
  const helperValidation = (
    errorEmailValidate: boolean,
    errorEmail: boolean
  ) => {
    if (errorEmailValidate) {
      return "Email not found, this user doesn't exist.";
    } else if (errorEmail) {
      return "Email already registered. Please use another!";
    } else {
      return "";
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Container
        component="main"
        maxWidth="xs"
        className={classes.paperContainer}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <Typography component="h1" variant="h2">
              Remember
            </Typography>
            <Typography component="h1" variant="h2">
              To Do!
            </Typography>
          </div>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={email}
              error={errorEmail || errorEmailValidate}
              helperText={helperValidation(errorEmailValidate, errorEmail)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={password}
              error={errorPassword}
              helperText={errorPassword ? "Incorrect password" : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container className={classes.userControls}>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  style={{ minWidth: "2px" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Copyright />
            </Grid>
          </form>
        </div>
      </Container>
    </Container>
  );
};

export default LoginForm;
