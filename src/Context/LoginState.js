import { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext();

const LoginState = (props) => {
  let [loginScreen, setLoginScreen] = useState(false);
  let [signupScreen, setSignupScreen] = useState(false);
  let [loginedScreen, setLoginedScreen] = useState(false);
  return (
    <LoginContext.Provider
      value={{
        loginScreen,
        setLoginScreen,
        signupScreen,
        setSignupScreen,
        loginedScreen,
        setLoginedScreen
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginState, LoginContext };
