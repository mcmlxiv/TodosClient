import React, { MutableRefObject } from "react";
import { mainProps, todosType } from "../types.model";
import { PaletteType } from "@material-ui/core";

export const ColorContext = React.createContext("");
export const SideBarContext = React.createContext<mainProps>({
  toggleDarkTheme: () => void {},
  newTheme: { palette: { type: "" as PaletteType } },
  handleLogout: () => void {},
});
export const CrudHandlingTodo = React.createContext<crudHandlers>({
  todoAddHandler(text: string, title: string): void {},
  todoDeleteHandler(todosId: string): void {},
  todoPinStatusHandler(
    todosId: string,
    text: React.MutableRefObject<string>,
    Date: string
  ): void {},
  todoStatusHandler(
    todosId: string,
    text: React.MutableRefObject<string>,
    Date: string
  ): void {},
  todoUpdateHandler(
    todosId: string,
    text: React.MutableRefObject<string>,
    Date: string
  ): void {},
  todos: [],
  language: false,
});

export type crudHandlers = {
  language: boolean;
  todoAddHandler: (text: string, title: string) => void;
  todoDeleteHandler: (todosId: string) => void;
  todoUpdateHandler: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
  todoStatusHandler: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
  todoPinStatusHandler: (
    todosId: string,
    text: MutableRefObject<string>,
    Date: string
  ) => void;
  todos: todosType[];
};
export const CrudContext = React.createContext<crudHandlers>({
  todoAddHandler(text: string, title: string): void {},
  todoDeleteHandler(todosId: string): void {},
  todoPinStatusHandler(
    todosId: string,
    text: React.MutableRefObject<string>,
    Date: string
  ): void {},
  todoStatusHandler(
    todosId: string,
    text: React.MutableRefObject<string>,
    Date: string
  ): void {},
  todoUpdateHandler(
    todosId: string,
    text: React.MutableRefObject<string>,
    Date: string
  ): void {},
  todos: [],
  language: false,
});
export const useCrudHandlingContext = () => React.useContext(CrudContext);
export default CrudContext;
