import gql from "graphql-tag";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "apollo-boost";
import { todosType, user } from "../types.model";
import { getAccessToken, isLoggedIn } from "./auth";

//get and post qpi requests
// GraphQL requests
//using Apollo Client
//HttpLink handling from apollo
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL });
//custom middleware to add authorization to the POST header
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    //const userToken = getUserToken();
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        userAuthorization: getAccessToken() || null,
      },
    }));
  }
  return forward(operation);
});
//Apollo Client config
const client = new ApolloClient({
  //to let us connect to the server use HTTPLink
  //uri config to accept server address
  // link: ApolloLink.from([authLink, httpLink]),
  link: concat(authLink, httpLink),

  //cache implementation this is cached objects stays in memory
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
//Axios Post request more robust setup than apollo so far
// const graphqlRequest = async (query: string, variables = {}) => {
//   return await axios({
//     method: "post",
//     url: endpointURL,
//     headers: { "content-type": "application/json" },
//     data: { query, variables },
//   })
//     .then(async (response) => await response.data)
//     .catch((errors) => {
//       //axios err handling for bad query searches like mistypings
//       //only in development
//       if (errors.response) {
//         const message = errors.response.data.errors
//           .map(({ message }: { message: string }) => message) //destructured off of err object
//           .join("\n"); //concat with new line error messages
//         throw new Error(message); // throw message to screen
//       }
//     });
// };

// Load all users on Sign up to compare credentials for auth
export const loadAllUsers = async () => {
  const query = gql`
    {
      users {
        id
        email
        firstName
      }
    }
  `;
  const {
    data: { users },
  } = await client.query({ query });
  return await users;
};

//Load user account to do list on page mount
export const loadUserTodos = async (id: string | null) => {
  const query = gql`
    query UserQuery($id: ID!) {
      user(id: $id) {
        id
        #        email
        #        password
        firstName
        todoList {
          id
          Date
          text
          title
          todoChange
          todosActive
          todosPin
          userId
        }
      }
    }
  `;
  //Apollo Client Issue
  //unable to resolve useEffect clean up for function on unMount
  //component is called once or twice more after unmounting has occurred causing mem leak
  //using axios
  const {
    data: { user },
  } = await client.query({ query, variables: { id } });
  return await user;
  // const {
  //   data: { user },
  // } = await graphqlRequest(query, { id });
  // return await user;
};

//create Todos
export const createTodos = async (input: todosType) => {
  const mutation = gql`
    mutation CreateTodo($input: TodoInput) {
      todo: createTodo(input: $input) {
        id
        Date
        title
        text
        todoChange
        todosActive
        todosPin
        userId
      }
    }
  `;

  const {
    data: { todo },
  } = await client.mutate({
    mutation,
    variables: { input },
  });
  return todo;
};

// update todos
export const updateTodos = async (input: todosType) => {
  const mutation = gql`
    mutation UpdateTodo($input: TodoInput) {
      todo: updateTodo(input: $input) {
        id
        todosActive
        todosPin
        Date
        title
        todoChange
        text
      }
    }
  `;

  const {
    data: { todo },
  } = await client.mutate({ mutation, variables: { input } });
  return await todo;
};

//Delete todos
export const deleteTodos = async (id: string) => {
  const mutation = gql`
    mutation DeleteTodo($id: ID!) {
      todo: deleteTodo(id: $id) {
        id
      }
    }
  `;

  const {
    data: { todo },
  } = await client.mutate({ mutation, variables: { id } });
  return await todo;
};

///
//Create User
export const createUser = async (input: user) => {
  const mutation = gql`
    mutation CreateUser($input: UserInput) {
      user: createUser(input: $input) {
        id
        email
        password
        firstName
        lastName
      }
    }
  `;
  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { input } });
  return user;
};
///Update users
export const updateUsers = async (input: user) => {
  const mutation = gql`
    mutation UpdateUser($input: UserInput) {
      user: updateUser(input: $input) {
        id
        email
        password
        firstName
        lastName
      }
    }
  `;

  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { input } });
  return user;
};
//Delete User
export const deleteUser = async (id: string) => {
  const mutation = gql`
    mutation deleteUser($id: ID) {
      user: deleteUser(id: $id) {
        id
        todoList {
          id
          Date
          text
          title
          todoChange
          todosActive
          todosPin
          userId
        }
      }
    }
  `;
  const {
    data: { user },
  } = await client.mutate({ mutation, variables: { id } });
  return user;
};
// export const loadUserTodos = async (id: string | null) => {
//   const query = gql`
//     query UserQuery($id: ID!) {
//       user(id: $id) {
//         id
//         #        email
//         #        password
//         firstName
//         todoList {
//           id
//           Date
//           text
//           title
//           todoChange
//           todosActive
//           todosPin
//           userId
//         }
//       }
//     }
//   `;
//   //Apollo Client Issue
//   //unable to resolve useEffect clean up for function on unMount
//   //component is called once or twice more after unmounting has occurred causing mem leak
//   //using axios
//   const {
//     data: { user },
//   } = await client.query({ query, variables: { id } });
//   return await user;

//
// Before refactor and err handling
// export const loadTodos = async () => {
//   const response = await axios({
//     method: "post",
//     url: "http://localhost:9000/graphql",
//     headers: { "content-type": "application/json" },
//     data: {
//       query: `{
//   todoList{
//     Date
//     id
//     text
//     title
//     todoChange
//     todosActive
//   }
// }`,
//     },
//   });
//   return await response.data.data.todoList;
// };
// export const loadTodos = async () => {
//   const query = `{
//   todoList{
//     Date
//     id
//     text
//     title
//     todoChange
//     todosActive
//   }
// }`;
//   const {
//     data: { todoList },
//   } = await graphqlRequest(query);
//   return await todoList;
// };
