import React, { useState, useEffect, useContext } from "react";
import Signup from "./Signup";
import Login from "./Login";
import TodoList from "./TodoList";
import { LoginContext } from "../Context/LoginState";

function MainScreen() {
  let a = useContext(LoginContext);
  // let [loginScreen, setLoginScreen] = useState(false);
  // let [signupScreen, setSignupScreen] = useState(false);
  // let [loginedScreen, setLoginedScreen] = useState(false);
  console.log("err", a);
  const afterSignup = (username) => {
    a.setSignupScreen(false);
    a.setLoginScreen(false);
    a.setLoginedScreen(true);
  };

  const afterLogout = () => {
    localStorage.removeItem("userlogined");
    a.setSignupScreen(true);
    a.setLoginScreen(false);
    a.setLoginedScreen(false);
  };

  useEffect(() => {
    let user = localStorage.getItem("userlogined");
    if (user !== null || user !== "") {
      a.setSignupScreen(false);
      a.setLoginScreen(false);
      a.setLoginedScreen(true);
    }
  }, []);

  return (
    <div className="MainScreen">
      {a.signupScreen ? (
        <div>
          <Signup afterSignup={afterSignup} />
          <button
            className="btn btn-dark"
            onClick={() => {
              a.setSignupScreen(false);
              a.setLoginScreen(true);
            }}
          >
            do login
          </button>
        </div>
      ) : (
        ""
      )}

      {a.loginScreen ? (
        <div>
          <Login afterLogin={afterSignup} />
          <button
            className="btn btn-dark"
            onClick={() => {
              a.setSignupScreen(true);
              a.setLoginScreen(false);
            }}
          >
            do signup
          </button>
        </div>
      ) : (
        ""
      )}

      {a.loginedScreen ? (
        <div>
          <h1>{localStorage.getItem("userlogined")} logged in</h1>
          <button onClick={afterLogout} className="btn btn-danger">
            logout
          </button>
          <TodoList />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MainScreen;
