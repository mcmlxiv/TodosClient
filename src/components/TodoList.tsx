///
import React from "react";
import { Container, Grid } from "@material-ui/core";
import { todoListProps } from "../types.model";
import "./TodoList.css";
import ListItem from "./ListItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import { CrudHandlingTodo } from "../hooks/CrudContext";

// Rendering To do list and handling props multiplication and grid
const TodoList: React.FC<todoListProps> = ({ items }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const spacingsY = matches ? 6 : 0;
  const spacingsX = matches ? 0 : 6;

  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        //maxWidth: "30rem",
        padding: "1rem",
      },
    },
  }));
  const classes = useStyles();

  const {
    todoUpdateHandler,
    todoDeleteHandler,
    todoStatusHandler,
    todoPinStatusHandler,
  } = React.useContext(CrudHandlingTodo);

  return (
    <Container>
      <Grid container direction={"column"} spacing={spacingsY}>
        <Grid container spacing={spacingsX} className={classes.root}>
          {/*Material Ui grid*/}
          {items?.map((todo) => (
            <Grid
              item
              key={todo.id}
              xs={12}
              style={{ paddingTop: "3rem", paddingBottom: "0.2rem" }}
            >
              <ListItem
                onUpdateTodo={todoUpdateHandler}
                onDeleteTodo={todoDeleteHandler}
                onStatusUpdate={todoStatusHandler}
                onPinStatus={todoPinStatusHandler}
                key={todo.id}
                id={todo.id}
                date={todo.Date}
                todoTitle={todo.title}
                todoText={todo.text}
                todoChange={todo.todoChange}
                todosActive={todo.todosActive}
                todosPin={todo.todosPin}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
export default TodoList;
