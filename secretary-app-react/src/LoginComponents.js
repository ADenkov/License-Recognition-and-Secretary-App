import React, { useState } from "react";
import Login from "./Login";
import Logo from "./images/login.png"
import "./App.css";

function LoginComponents(props) {
  return (
    <span className="h3">
      <h1> Login </h1> <hr></hr>
      <center>
        <img src={Logo} alt="logo img" />
        <div className="col-12 col-lg-4 mt-2 hv-center">
          <form>
            <div className="form-group text-left">
              <input
                type="username"
                className="form-control"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="form-group text-left">
              <input
                type="password"
                className="form-control"
                id="Password"
                placeholder="Password"
              />
            </div>
            <a href="btnPage" class="btn btn-info" role="button">
              Login
            </a>
          </form>
        </div>
      </center>
    </span>
  );
}
export default LoginComponents;
