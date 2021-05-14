import React from "react";
import TodoList from "../TodoList";
import { todoListProps } from "../../types.model";
import "./../TodoList.css";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CrudHandlingTodo } from "../../hooks/CrudContext";

const ActiveList: React.FC<todoListProps> = ({ items }) => {
  //filter todos based their status and sort in Active section
  const filteredTodos = items?.filter(
    (filtered) => filtered.todosActive && !filtered.todosPin
  );
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "1rem",
      paddingBottom: "2rem",
      display: "flex",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();
  const { language } = React.useContext(CrudHandlingTodo);
  const helperText = language
    ? "Unfinished little dreams or Todos!"
    : "未完成的小夢想或Todos!";

  return (
    <Container className={classes.root}>
      <section className={"projects"}>
        <header>
          <Typography variant={"h5"} align={"center"} gutterBottom>
            {language ? "Active Todos" : "積極的 Todos"}
          </Typography>
          <Typography
            variant={"body2"}
            align={"center"}
            color={"textSecondary"}
            paragraph={true}
            gutterBottom
          >
            {helperText}
          </Typography>
        </header>
        {filteredTodos && <TodoList items={filteredTodos} />}
      </section>
    </Container>
  );
};

export default ActiveList;
