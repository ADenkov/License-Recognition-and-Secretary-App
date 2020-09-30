import React from "react";
import Login from "./Login";
import "./App.css";
import LoginComponents from "./LoginComponents";
import ButtonPage from "./ButtonPage";
import RegisterClient from "./RegisterClient";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { register } from "./serviceWorker";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/loginPage" component={LoginComponents} />
          <Route path="/btnPage" component={ButtonPage} />
          <Route path="/registerClient" component={RegisterClient} />
        </header>
      </div>
    </Router>
  );
}

export default App;
