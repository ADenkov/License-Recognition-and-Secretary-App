import React from "react";

function ButtonPage() {
  return (
    <center>
      <>
        <a href="registerClient" variant="register" class="btn btn-info crud" size="lg" active>
          Register
        </a>
        <a href="clientsInfo" variant="update" class="btn btn-info crud" size="lg" active>
          Clients
        </a>
      </>
    </center>
  );
}
export default ButtonPage;
