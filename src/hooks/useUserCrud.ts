import { useEffect, useState } from "react";
import { createUser, deleteUser, loadUserTodos } from "../api/requests";
import { user } from "../types.model";
import { v4 as uuidv4 } from "uuid";

//User Crud operations
const useUserCrud = () => {
  const [user, setUser] = useState<user[]>([]);
  const getUserToken = () => {
    return localStorage.getItem("user");
  };
  //Saving and Render from db
  useEffect(() => {
    (async () => {
      //todoList for specific users
      const userQuery = await loadUserTodos(getUserToken());
      if (userQuery) {
        setUser(userQuery.todoList || []);
      }
    })();
  }, []);

  ////ADDING User
  const userAddHandler = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    //Create unique user IDs for users
    const id: string = uuidv4();

    //initialize and set state

    setUser((prevUser) => [
      ...(prevUser || []),
      {
        id,
        firstName,
        lastName,
        email,
        password,
      },
    ]);
    //Database operation Create
    createUser({
      id,
      firstName,
      lastName,
      email,
      password,
    }).then(() => console.log("successfully created user"));
  };

  // DELETE Todos
  const userDeleteHandler = (userId: string) => {
    //delete Handler for deletion of arr

    // setUser((prevUser) => {
    //   //return obj with all the arr with id !== to current todos
    //   return prevUser.filter((user: { id: string }) => user.id !== userId);
    // });
    //Database operation Delete

    deleteUser(String(userId)).then(() => console.log("successfully deleted"));
  };
  const usersDeleteHandler = (
    userId: string,
    history: { push: (login: string) => void },
    handleLogout: () => void,
    logout: () => void
  ) => {
    logout();
    handleLogout();
    console.log(history);
    history.push("/login");
    deleteUser(String(userId)).then(() => console.log("successfully deleted"));
  };
  //
  // ////STATUS CHANGING
  // // const todoStatusHandler = (todosId: string) => {
  // //   //Status Handler for status change of arr
  // //   const filteredTodo = todos.find(
  // //     //find and store all todos in obj
  // //     (element: todosType) => element.id === todosId
  // //   )!; //Assert for null checking
  // //   //checking for undefined values from text,date, title updates if none return
  // //
  // //   filteredTodo!.todosActive = filteredTodo.todosActive
  // //     ? !todosActive
  // //     : todosActive;
  // //
  // //   setTodos((prevTodos) => {
  // //     return prevTodos.filter((updatedTodo) => updatedTodo.id !== todosId);
  // //   });
  // //
  // //   setTodos((prevTodos) => [...prevTodos, filteredTodo]);
  // //   //Database operation Status Update
  // //   updateTodos(filteredTodo).then(() =>
  // //     console.log("Status successfully changed")
  // //   );
  // // };
  //
  // ///UPDATES Todos
  // const userUpdateHandler = (
  //   todosId: string,
  //   text: React.MutableRefObject<string>,
  //   updatedDate: string
  // ) => {
  //   const updatedTodo = todos.find(
  //     //find and store all todos in obj
  //     (element: todosType) => element.id === todosId
  //   );
  //   if (!updatedTodo) {
  //     //null checking
  //     return null;
  //   } else {
  //     //checking for undefined values from text,date, title updates if none return
  //     updatedTodo.text = text.current ? text.current : updatedTodo.text;
  //     updatedTodo.Date = updatedDate ? updatedDate : updatedTodo.Date;
  //     updatedTodo.todosActive = todosActive;
  //     //on successful update of todos find and set the date to new date and Edited time
  //     const updatedDateInfo = document.querySelector("#Date") as HTMLElement;
  //     updatedTodo.todoChange = `Edited at : `;
  //     updatedDateInfo.innerHTML = updatedTodo.todoChange + updatedTodo.Date;
  //     text.current = "";
  //   }
  //
  //   setTodos((prevTodos) => {
  //     return prevTodos.filter((updatedTodo) => updatedTodo.id !== todosId);
  //   });
  //
  //   setTodos((prevTodos) => [...prevTodos, updatedTodo]);
  //   //Database operation Update
  //   updateTodos(updatedTodo).then(() => console.log("successfully updated"));
  // };

  return {
    // todoStatusHandler,
    userAddHandler,
    userDeleteHandler,
    usersDeleteHandler,
    // userUpdateHandler,
    user,
  };
};

export { useUserCrud };
