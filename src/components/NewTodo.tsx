import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import "./NewTodo.css";

interface newTodoProps {
  onAddTodo: (text: string, title: string) => void;
  language: boolean;
}

const NewTodo: React.FC<newTodoProps> = ({ onAddTodo, language }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredText = textInputRef.current!.value;
    const enteredTitle = titleInputRef.current!.value;
    onAddTodo(enteredText, enteredTitle);
    //Reset text fields after submit
    textInputRef.current!.value = "";
    titleInputRef.current!.value = "";
  };
  return (
    <form onSubmit={todoSubmitHandler} autoComplete="off">
      <div className="form-control">
        <TextField
          label={`${language ? "Title" : "標題"}`}
          type="text"
          inputRef={titleInputRef}
          fullWidth
          required
          style={{ paddingBottom: "1rem" }}
          variant="outlined"
        />
        <br />
        <TextField
          label="To Do"
          type="text"
          inputRef={textInputRef}
          autoComplete="off"
          fullWidth
          required
          multiline
          rows={2}
          variant="outlined"
          id={"textarea"}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<AddIcon />}
      >
        <Typography>{language ? "Add Todo" : "加做"}</Typography>
      </Button>
    </form>
  );
};

export default NewTodo;
