import React, { useEffect, useState } from "react";
import "./TodoList.css";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useUserCrud } from "../hooks/useUserCrud";
import { logout } from "../api/auth";
import { useHistory } from "react-router-dom";
import { SideBarContext } from "../hooks/CrudContext";
import { loadUserTodos } from "../api/requests";

const DeleteUser = ({ language }: { language: boolean }) => {
  //Delete current User button
  const { newTheme } = React.useContext(SideBarContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "none",
      padding: 4,
      margin: 0,
      paddingTop: "1rem",
      paddingBottom: "1rem",
      transform: "scale(10rem)",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        backgroundColor: "none",
      },
    },
    button: {
      border: "none",
      background: "none",
      margin: 0,
      padding: 0,
      cursor: "pointer",
      "&:hover": {
        background: "none",
      },
      color: "#f38375",

      [theme.breakpoints.down("md")]: {
        color: "#f38375",
        backgroundColor: "none",

        borderTop: `solid ${
          newTheme.palette.type === "dark" ? "white" : "black"
        }`,
        padding: "1rem",
        marginTop: "1rem",
      },
    },
  }));
  const classes = useStyles();

  const { usersDeleteHandler } = useUserCrud();
  let history = useHistory();
  const { handleLogout } = React.useContext(SideBarContext);
  const [userId, setUserId] = useState("");
  const handleLogouts = () => {
    logout();
    handleLogout();
    history.push("/login");
  };
  //Delete user func
  useEffect(() => {
    //Clean up for Loading current User Name on UI
    //useEffect Clean Up
    let mounted = true;
    (async () => {
      if (mounted) {
        const getUserToken = () => {
          return localStorage.getItem("user");
        };
        const usersQuery = await loadUserTodos(getUserToken());
        //Set userName to current user's userName
        if (usersQuery) {
          setUserId(usersQuery.id);
        }
      }
    })();
    //useEffect Clean Up
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container className={classes.root}>
      <section className={"projects"}>
        <header>
          <button
            //Delete current To do button
            // className={classes.menuButtonDelete}

            className={classes.button}
            aria-label={`${language ? "Delete User" : "刪除用戶"}`}
            onClick={usersDeleteHandler.bind(
              null,
              userId,
              history,
              handleLogouts,
              logout
            )}
          >
            <Typography
              variant={"h6"}
              align={"center"}
              style={{ fontSize: "1rem" }}
              gutterBottom
            >
              {language ? "Delete Account" : "刪除帳戶"}
            </Typography>
          </button>
        </header>
      </section>
    </Container>
  );
};

export default DeleteUser;
