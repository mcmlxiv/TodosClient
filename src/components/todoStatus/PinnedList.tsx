import React from "react";
import TodoList from "../TodoList";
import { todoListProps } from "../../types.model";
import "./../TodoList.css";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CrudHandlingTodo } from "../../hooks/CrudContext";
const PinnedList: React.FC<todoListProps> = ({ items }) => {
  //filter todos based their Pinned status and sort in Pinned section
  const filteredTodos = items?.filter((filtered) => filtered.todosPin);
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "1rem",

      display: "flex",
      justifyContent: "center",
    },
    border: {
      [theme.breakpoints.down("md")]: {
        borderTop: "solid",
        padding: "1rem",
        paddingTop: "3rem",
        marginTop: "1rem",
      },
    },
  }));
  const classes = useStyles();
  const { language } = React.useContext(CrudHandlingTodo);
  const helperText = language
    ? "Pin your Todos for later!"
    : "固定您的Todos以備後用！ ";

  return (
    <Container className={classes.root}>
      <section>
        <header>
          <Typography
            variant={"h5"}
            align={"center"}
            className={classes.border}
            gutterBottom
          >
            {language ? "Pinned Todos" : "固定 Todos"}
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

export default PinnedList;
