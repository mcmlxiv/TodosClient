import React from "react";
import { todoListProps } from "../../types.model";
import "./../TodoList.css";
import TodoList from "../TodoList";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CrudHandlingTodo } from "../../hooks/CrudContext";
const FinishedList: React.FC<todoListProps> = ({ items }) => {
  //filter todos based their status and sort in Finished section
  const filteredTodos = items?.filter(
    (filtered) => !filtered.todosActive && !filtered.todosPin
  );
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      paddingRight: 3,
    },
    border: {
      borderTop: "solid",
      paddingTop: "3rem",

      padding: "1rem",
      marginTop: "1rem",
    },
  }));
  const classes = useStyles();
  const { language } = React.useContext(CrudHandlingTodo);
  const helperText = language
    ? "Completed Todos live here!"
    : "完成的Todos住在這裡！";

  return (
    <div className={classes.root}>
      <section>
        <header>
          <Typography
            variant={"h5"}
            align={"center"}
            className={classes.border}
            gutterBottom
          >
            {language ? "Finished Todos" : "完成的 Todos"}
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
    </div>
  );
};

export default FinishedList;
