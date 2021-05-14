import React, { useEffect, useState } from "react";
import {
  createTodos,
  deleteTodos,
  loadUserTodos,
  updateTodos,
} from "../api/requests";
import { todosActive, todosType, todosPin } from "../types.model";
import moment from "moment";
import { getUserToken } from "../api/auth";

//Crud operations
const useCrud = () => {
  const [todos, setTodos] = useState<todosType[]>([]);

  //Saving and Render from db
  useEffect(() => {
    //store state as side effect to local storage for easy persistence through page reload
    //load gql data from post req in requests file
    (async () => {
      //todoList for specific users
      const userQuery = await loadUserTodos(getUserToken());
      if (userQuery) {
        setTodos(userQuery.todoList);
      } else {
        setTodos([]);
      }
    })();
  }, []);

  ////ADDING Todos
  const todoAddHandler = (text: string, title: string) => {
    //uniqueId only produces an id set per session upon refresh the count goes back 0 causing localstorage clash
    //read local storage and make unique check and add 1 if id found maintaining +1 pattern
    //check database obj for highest occurring id and store
    const highestId = !todos
      ? 0
      : Math.max.apply(
          Math,
          todos.map((high: { id: string }) => {
            return Number(high.id);
          })
        );
    //check for -infinity value that occurs when local storage is empty and return undefined
    const highCheck = highestId > 0 ? highestId : undefined;
    //if undefined value return 1 for first todo
    const id: string = highCheck ? `${String(highCheck + 1)}` : "1";
    const todoChange = "";

    setTodos((prevTodos) => [
      ...(prevTodos || []),
      {
        id,
        text,
        title,
        Date: moment().format("MMM Do YY"),
        todoChange,
        todosActive: true,
        todosPin: false,
        userId: getUserToken(),
      },
    ]);
    //Database operation Create
    createTodos({
      id,
      text,
      title,
      Date: moment().format("MMM Do YY"),
      todoChange,
      todosActive: true,
      todosPin: false,
      userId: getUserToken(),
    }).then();
  };

  ////DELETE Todos
  const todoDeleteHandler = (todosId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todosId);
    });
    //Database operation Delete
    deleteTodos(todosId).then();
  };

  ////update Handling function
  const updateHandler = (
    todosId: string,
    text: React.MutableRefObject<string>,
    updatedDate: string,
    statusState: boolean = false,
    pinState: boolean = false
  ) => {
    const updatedTodo = todos.find(
      //find and store all todos in obj
      (element: todosType) => element.id === todosId
    );
    let source;
    if (!updatedTodo) {
      //null checking
      return null;
    } else {
      source = {
        text: text.current ? text.current : updatedTodo.text,
        Date: updatedDate,
        todosActive: statusState
          ? updatedTodo.todosActive
            ? !todosActive
            : todosActive
          : updatedTodo.todosActive,
        // statusState default to false if true run if
        //if set opposite of current todosActive
        //otherwise default to current todosActive state
        todoChange: `Edited at : `,
        todosPin: pinState
          ? updatedTodo.todosPin
            ? todosPin
            : !todosPin
          : updatedTodo.todosPin,
        // pinState default to false if true run if statement inside
        //if todosPin is true set to true
        //otherwise default to current todosPin state
        //ensuring that pinned todos stay in the pinned section
      };

      const updatedDateInfo = document.querySelector("#Date") as HTMLElement;
      // updatedTodo.todoChange = `Edited at : `;
      updatedDateInfo.innerHTML = updatedTodo.todoChange + updatedTodo.Date;
      text.current = "";
    }
    const returnedTarget = Object.assign(updatedTodo, source);
    setTodos((prevTodos) => {
      return prevTodos.filter((updatedTodo) => updatedTodo.id !== todosId);
    });

    setTodos((prevTodos) => [...prevTodos, returnedTarget]);
    //Database operation Update
    updateTodos(returnedTarget).then();
  };

  //Update Finished/Active status
  const todoStatusHandler = (
    todosId: string,
    text: React.MutableRefObject<string>,
    updatedDate: string
  ) => {
    const statusState = true;
    updateHandler(todosId, text, updatedDate, statusState);
  };
  //Update Pin
  const todoPinStatusHandler = (
    todosId: string,
    text: React.MutableRefObject<string>,
    updatedDate: string
  ) => {
    const pinState = true;
    const statusState = false;
    updateHandler(todosId, text, updatedDate, statusState, pinState);
  };
  ///UPDATES Todos
  const todoUpdateHandler = (
    todosId: string,
    text: React.MutableRefObject<string>,
    updatedDate: string
  ) => {
    updateHandler(todosId, text, updatedDate);
  };

  return {
    todoStatusHandler,
    todoAddHandler,
    todoDeleteHandler,
    todoUpdateHandler,
    todoPinStatusHandler,
    todos,
  };
};

export { useCrud };
