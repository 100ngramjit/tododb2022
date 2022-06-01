import { LoginState } from "./Context/LoginState";
import "./styles.css";

import MainScreen from "./Components/MainScreen";

export default function App() {
  return (
    <LoginState>
      <div className="App">
        <MainScreen />
      </div>
    </LoginState>
  );
}
