import React, { useState } from "react";

function LoginComponents(props) {
  return (
    <center>
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <br></br>
          <a href="/">Forgot username/password?</a>
        </form>
      </div>
    </center>
  );
}
export default LoginComponents;
