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
import { signUp } from "../api/auth";
import { loadAllUsers } from "../api/requests";
import { signupProps } from "../types.model";

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
  hide: {
    display: "none",
  },
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
}));

const SignupForm: React.FC<signupProps> = ({
  onAddUser,
  onLogin,
  onUserLogin,
}) => {
  const classes = useStyles();
  //refs for text fields
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const reEnterPassword = useRef<HTMLInputElement>(null);
  const firstName = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  //States for Error Messages on Helper text
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailValidate, setErrorEmailValidate] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  let history = useHistory();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorEmailValidate(false);

    //Using Regex to check user Email pattern example@example.com
    const validateEmail = (email: string) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    //Validating email
    const validEmail = validateEmail(email.current!.value);
    //Union type for enteredEmail consume input email or false and trigger error
    const enteredEmail: string | boolean = validEmail
      ? email.current!.value
      : false;

    const reEnteredPassword = reEnterPassword.current!.value;

    //capture other inputs
    const enteredPassword = password.current!.value;
    const enteredFirstName = firstName.current!.value;
    const enteredLastName = lastName.current!.value;

    //If enteredEmail is string therefore valid trigger Api request
    if (typeof enteredEmail === "string") {
      (async () => {
        //load all users from the DB
        const usersQuery = await loadAllUsers();
        //Find if user email already exists in the DB
        const userExists = usersQuery.find(
          (user: any) => user.email === enteredEmail
        );
        const samePass = reEnteredPassword === enteredPassword;

        //if userExists trigger UI error Email already exists
        if (userExists) {
          setErrorEmail(true);
        } else if (!samePass) {
          setErrorPassword(true);
        } else {
          //else create user with captured Inputs
          onAddUser(
            enteredEmail,
            enteredPassword,
            enteredFirstName,
            enteredLastName
          );
          //upon Sign up success redirect to app page and login
          signUp(enteredEmail, enteredPassword).then((response) => {
            if (response.statusText === "OK") {
              //On correct credentials login

              onLogin();
              history.push("/");
            }
          });
        }
      })();
    } else {
      return setErrorEmailValidate(true);
    }

    firstName.current!.value = "";
    lastName.current!.value = "";
  };
  //Email Validation on display on GUI for email Helper Text
  const helperValidation = (
    errorEmailValidate: boolean,
    errorEmail: boolean
  ) => {
    if (errorEmailValidate) {
      return "Invalid Email, email should be like example@example.com";
    } else if (errorEmail) {
      return "Email already registered. Please use another!";
    } else {
      return "";
    }
  };
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
          <form
            className={classes.form}
            noValidate
            onSubmit={submitHandler}
            autoComplete="chrome-off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="off"
                  inputRef={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id={"email"}
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="new-username"
                  inputRef={email}
                  error={errorEmail || errorEmailValidate}
                  helperText={helperValidation(errorEmailValidate, errorEmail)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={password}
                  error={errorPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Re-enter Password"
                  type="password"
                  id="reEnterPassword"
                  autoComplete="new-password"
                  inputRef={reEnterPassword}
                  error={errorPassword}
                  helperText={errorPassword ? "Passwords aren't the same" : ""}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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

export default SignupForm;
