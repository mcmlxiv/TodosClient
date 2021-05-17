import React from "react";
import { AnimatePresence } from "framer-motion";
import Landing from "./Landing";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import SideBar from "./SideBar";
import ActiveList from "./todoStatus/ActiveList";
import FinishedList from "./todoStatus/FinishedList";
import { useCrud } from "../hooks/useCrud";
import { useAnimation } from "../hooks/useAnimation";
import PinnedList from "./todoStatus/PinnedList";
import { CrudHandlingTodo } from "../hooks/CrudContext";
import DeleteUser from "./DeleteUser";

const MainApp: React.FC = () => {
  //
  // Crud operation hook
  const {
    todoUpdateHandler,
    todoDeleteHandler,
    todoAddHandler,
    todoStatusHandler,
    todoPinStatusHandler,
    todos,
  } = useCrud();

  //Animation hook
  const { showLoading, setShowLoading } = useAnimation();
  //State for opening of ToolBar on phone display sizes
  const [open, setOpen] = React.useState<boolean>(false);
  const [language, setLanguage] = React.useState<boolean>(false);
  const handleLanguageChange = () => {
    setLanguage(!language);
  };

  const handleDrawerOpen = () => {
    //when drawer is closed setOpen set to false and drawer open SetOpen is true
    setOpen(!open);
  };

  //MUI styling
  const useStyles = makeStyles((theme) => ({
    page: {
      width: "100%",
      display: "flex",

      margin: "2rem auto",
      [theme.breakpoints.down("lg")]: {
        margin: 0,
      },
    },
    list: {
      [theme.breakpoints.up("lg")]: {
        transform: "translateX(10rem)",
      },
      [theme.breakpoints.down("lg")]: {
        marginLeft: "10rem",
        padding: 0,
      },
      [theme.breakpoints.down("md")]: {
        marginTop: `${!open ? "31.5rem" : "15rem"}`,
        padding: 0,
        marginLeft: 0,
      },
    },
    innerList: {
      paddingTop: "5rem",
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        order: 99,
      },
    },
    pinnedList: {
      [theme.breakpoints.down("md")]: {
        order: 0,
      },
    },
    delete: {
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();

  //Props for Context passing
  const crudHandlers = {
    todoUpdateHandler,
    todoDeleteHandler,
    todoAddHandler,
    todoStatusHandler,
    todoPinStatusHandler,
    todos,
    language,
  };

  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={() => setShowLoading(false)}
    >
      <>
        <Landing showLoading={showLoading} />
        {!showLoading && (
          <>
            <CssBaseline />
            <Container maxWidth="xl" className={classes.page}>
              <SideBar
                todoAddHandler={todoAddHandler}
                handleDrawerOpen={handleDrawerOpen.bind(this)}
                open={open}
                language={language}
                handleLanguageChange={handleLanguageChange.bind(this)}
              />
              <Container maxWidth="lg" className={classes.list}>
                <div className={classes.innerList}>
                  <CrudHandlingTodo.Provider value={crudHandlers}>
                    <div>
                      <ActiveList items={todos} />
                      <FinishedList items={todos} />
                    </div>
                    <PinnedList items={todos} />
                  </CrudHandlingTodo.Provider>
                </div>
                <div className={classes.delete}>
                  <DeleteUser language={language} />
                </div>
              </Container>
            </Container>
          </>
        )}
      </>
    </AnimatePresence>
  );
};
export default MainApp;
