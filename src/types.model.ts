import { MutableRefObject, ReactNode } from "react";
import { PaletteType } from "@material-ui/core";

//Export type Definitions
export const todosActive: boolean = true;
export const todosPin: boolean = false;

//Export type Definitions

export type todosType = {
  //To do array definition
  id: string;
  text: string;
  title: string;
  Date: string;
  todoChange: string;
  todosActive: boolean;
  todosPin: boolean;
  userId: string | null;
};

export interface todoListProps {
  //To do list render props for Active and Finished
  items?: todosType[];
  onDeleteTodo?: (id: string) => void;
  onUpdateTodo?: (
    id: string,
    text: MutableRefObject<string>,

    Date: string
  ) => void;
  onStatusUpdate?: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
  onPinStatus?: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
}
export interface listProps {
  //todoList Props for rendering To do list on the list
  children?: ReactNode;
  id: string;
  date: string;
  todoTitle: string;
  todoText: string;
  todoChange: string;
  todosActive: boolean;
  todosPin: boolean;
  onDeleteTodo: (todosId: string) => void;
  onUpdateTodo: (
    todosId: string,
    text: MutableRefObject<string>,

    Date: string
  ) => void;
  onStatusUpdate: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
  onPinStatus: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
}

export interface showLoading {
  //Loading Props
  showLoading: boolean;
}
export interface sideBarProps {
  todoAddHandler: (text: string, title: string) => void;
  open: boolean;
  handleDrawerOpen: () => void;
  language: boolean;
  handleLanguageChange: () => void;
}

export type user = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface loginProps {
  onLogin: () => void;
  onUserLogin: (enteredId: string) => void;
}
export interface signupProps extends loginProps {
  onAddUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => void;
}
export interface mainProps {
  toggleDarkTheme: () => void;
  newTheme: { palette: { type: PaletteType } };
  handleLogout: () => void;
}
