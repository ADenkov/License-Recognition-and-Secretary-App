import React from "react";
import Login from "./Login";
import "./App.css";
import LoginComponents from "./LoginComponents";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <LoginComponents />
      </header>
    </div>
  );
}

export default App;
