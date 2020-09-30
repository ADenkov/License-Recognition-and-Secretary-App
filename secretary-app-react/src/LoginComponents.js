import React, { useState } from "react";
import Login from "./Login";
import "./App.css";
function LoginComponents(props) {
  return (
    <span className="h3">
      Login <hr></hr>
      <center>
        <img src="./src/images/login.jpg" />
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
