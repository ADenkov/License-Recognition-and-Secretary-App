import React from "react";
import Login from "./Login";
import "./App.css";
import LoginComponents from "./LoginComponents";
import ButtonPage from "./ButtonPage";
import RegisterClient from "./RegisterClient";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { register } from "./serviceWorker";
import UpdateClient from "./UpdateClient";
import DeleteClient from "./DeleteClient";
import ClientInfo from "./ClientInfo";


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/loginPage" component={LoginComponents} />
          <Route path="/btnPage" component={ButtonPage} />
          <Route path="/clientInfo" component={ClientInfo} />
          <Route path="/registerClient" component={RegisterClient} />
          <Route path="/updateClient" component={UpdateClient} />
          <Route path="/deleteClient" component={DeleteClient} />

        </header>
      </div>
    </Router>
  );
}

export default App;
