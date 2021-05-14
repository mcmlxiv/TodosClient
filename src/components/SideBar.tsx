import React, { useEffect, useState } from "react";
import {
  CardActions,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { sideBarProps } from "../types.model";
import NewTodo from "./NewTodo";
import LottieAnimation from "./LottieAnimation";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { logout } from "../api/auth";
import { loadUserTodos } from "../api/requests";
import { SideBarContext } from "../hooks/CrudContext";
import TranslateIcon from "@material-ui/icons/Translate";
import DeleteUser from "./DeleteUser";
import LightToggle from "./LightToggle";

//Sidebar component

//Passing props for toggle and theme along with Animation from App file
const SideBar: React.FC<sideBarProps> = ({
  todoAddHandler,
  handleDrawerOpen,
  open,
  language,
  handleLanguageChange,
}) => {
  const drawerWidth = 440;
  //Material UI styling props
  const useStyles = makeStyles((theme) => ({
    page: {
      width: "100%",
      height: "16.5rem",
    },
    draw: {
      width: drawerWidth,
      height: "100vh",
      paddingRight: "1rem",
      [theme.breakpoints.down("md")]: {
        display: "none",
        height: "auto",
        width: "100%",
        justifyItems: "center",
        margin: "auto auto",
      },
    },
    drawPaper: {
      width: drawerWidth,
      height: "100vh",
      display: "flex",
      paddingRight: "1rem",
      alignContent: "center",
      borderRadius: 10,

      boxShadow: "0 12px 12px 0 rgba( 0, 0, 0, 0.75 )",
      [theme.breakpoints.down("md")]: {
        height: "auto",
        width: "100%",
        justifyItems: "center",
        margin: "auto auto",
        boxShadow: `0 1px 1px 0 ${
          theme.palette.type === "dark" ? "white" : "grey"
        }`,
      },
    },
    section: {
      padding: "10rem",

      [theme.breakpoints.down("md")]: {
        padding: 0,
        paddingBottom: "10rem",
      },
    },
    menuButton: {
      display: "none",
      marginRight: 0,

      [theme.breakpoints.down("md")]: {
        transform: "translate(-0.6rem)",
        display: "block",
        padding: "2rem 3rem",
      },
    },
    menuButtonTranslate: {
      display: "none",
      [theme.breakpoints.down("md")]: {
        display: "block",
        margin: 0,
        padding: 8,
      },
    },
    menuButtonSignOuts: {
      display: "none",
      marginRight: 0,

      [theme.breakpoints.down("md")]: {
        display: "block",
        padding: 8,
      },
    },
    menuButtonSignOut: {
      [theme.breakpoints.down("md")]: {
        display: "block",
        padding: 8,
      },
    },
    menuButtonLights: {
      transform: "translateX(0.9rem)",
      padding: 0,
      margin: 0,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    hide: {
      transform: "translateX(0.9rem)",

      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    lights: {
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: "1.2rem",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: {
      paddingRight: "1rem",
      paddingLeft: "1.2rem",
      paddingTop: "2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    delete: {
      maxWidth: "200rem",
      transform: "translateY(3rem)",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  }));

  //Mui styling
  const classes = useStyles();

  //for history pushing to login page
  let history = useHistory();

  const [userName, setUserName] = useState("");
  const handleLogouts = () => {
    logout();
    handleLogout();
    history.push("/login");
  };

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
          setUserName(usersQuery.firstName);
        }
      }
    })();
    //useEffect Clean Up
    return () => {
      mounted = false;
    };
  }, []);

  const { handleLogout, newTheme, toggleDarkTheme } = React.useContext(
    SideBarContext
  );

  //Greeting based on Time of day
  const hour = new Date().getHours();
  const greetings = language
    ? "Good " +
      ((hour < 12 && "morning") || (hour < 18 && "afternoon") || "evening")
    : (hour < 12 && "早上好") || (hour < 18 && "下午好") || "晚上好";

  return (
    <div className={classes.section}>
      <Drawer
        variant={"permanent"}
        anchor={"left"}
        classes={{ paper: classes.drawPaper }}
      >
        <div className={classes.toolbar}>
          {/*Title of App*/}
          <Typography variant={"h5"}>Remember To Do!</Typography>

          <div style={{ display: "flex", transform: "translateX(0.9rem)" }}>
            <div
              color="inherit"
              aria-label={`${language ? "light" : "燈"}`}
              className={classes.menuButtonLights}
            >
              <LightToggle
                language={language}
                newTheme={newTheme}
                toggleDarkTheme={toggleDarkTheme}
              />
            </div>

            <Tooltip title={`${language ? "Translate" : "翻譯"}`}>
              <IconButton
                color="inherit"
                aria-label={`${language ? "Translate" : "翻譯"}`}
                onClick={handleLanguageChange}
                edge="start"
                //clsx constructing classname conditional
                className={classes.hide}
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={`${language ? "Sign Out" : "登出"}`}>
              <IconButton
                color="inherit"
                aria-label={`${language ? "Sign Out" : "登出"}`}
                onClick={handleLogouts}
                edge="start"
                //clsx constructing classname conditional
                className={clsx(classes.menuButtonSignOut, {
                  [classes.hide]: !open,
                })}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={`${language ? "Sign Out" : "登出"}`}>
              <IconButton
                color="inherit"
                aria-label={`${language ? "Sign Out" : "登出"}`}
                onClick={handleLogouts}
                edge="start"
                className={clsx(classes.menuButtonSignOuts, {
                  [classes.hide]: open,
                })}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Typography
          variant={"h6"}
          style={{ marginLeft: "1.2rem", fontSize: "1rem" }}
        >{`${greetings}, ${userName}.`}</Typography>

        <div
          className={clsx(classes.page, {
            [classes.hide]: open,
          })}
        >
          <NewTodo onAddTodo={todoAddHandler} language={language} />
          <LottieAnimation />
          <div className={classes.delete}>
            <DeleteUser language={language} />
          </div>
        </div>
        <div className={classes.lights}>
          <CardActions>
            <LightToggle
              language={language}
              newTheme={newTheme}
              toggleDarkTheme={toggleDarkTheme}
            />
          </CardActions>
          <Tooltip title={`${language ? "Expand to Add" : "展開添加"}`}>
            <IconButton
              color="inherit"
              aria-label={`${language ? "Open drawer" : "打開抽屜"}`}
              onClick={handleDrawerOpen}
              edge="start"
              //clsx constructing classname conditional
              className={clsx(classes.menuButton, {
                [classes.hide]: !open,
              })}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${language ? "Close to hide" : "接近隱藏"}`}>
            <IconButton
              color="inherit"
              aria-label={`${language ? "Close drawer" : "關閉抽屜"}`}
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <ExpandLessIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`${language ? "Translate" : "翻譯"}`}>
            <IconButton
              color="inherit"
              aria-label={`${language ? "Translate" : "翻譯"}`}
              onClick={handleLanguageChange}
              edge="start"
              //clsx constructing classname conditional
              className={classes.menuButtonTranslate}
            >
              <TranslateIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
