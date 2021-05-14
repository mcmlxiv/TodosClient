import React, { useEffect, useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import MainApp from "./components/MainApp";
import LoginForm from "./components/LoginForm";
import { useTheme, useUserCrud } from "./hooks/hooks";
import { isLoggedIn } from "./api/auth";
import SignupForm from "./components/SignupForm";
import { SideBarContext } from "./hooks/CrudContext";

//
const App: React.FC = () => {
  //toggle Theme hook

  //not performant
  const changedTheme = localStorage.getItem("theme");
  const defaultTheme = "light";
  const { muiTheme, toggleDarkTheme, newTheme } = useTheme(
    changedTheme || defaultTheme
  );

  //Log in / Out status handling
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  const handleLogin = () => {
    setLoggedIn(true);
  };
  //user Id in LS for page loading
  const [userID, setUserId] = useState("");
  const handleUserId = (enteredId: string) => {
    setUserId(enteredId);
  };
  //Check for user credentials in LS
  useEffect(() => {
    const userId = localStorage.getItem("user");
    //there is set again or use userID from state when user logins or signups else null
    localStorage.setItem("user", userId || userID || "");
  });
  const handleLogout = () => {
    setLoggedIn(false);
  };
  //user Sign up
  const { userAddHandler } = useUserCrud();

  //Props for Context passing
  const sideBar = {
    handleLogout,
    toggleDarkTheme,
    newTheme,
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <>
          <Route path="/" exact>
            {loggedIn ? (
              <SideBarContext.Provider value={sideBar}>
                <MainApp />
              </SideBarContext.Provider>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>

          <Route
            path="/login"
            render={() => (
              <LoginForm
                onLogin={handleLogin.bind(this)}
                onUserLogin={handleUserId.bind(this)}
              />
            )}
          />
        </>

        <Route path="/signup">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <SignupForm
              onAddUser={userAddHandler}
              onLogin={handleLogin.bind(this)}
              onUserLogin={handleUserId.bind(this)}
            />
          )}
        </Route>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
