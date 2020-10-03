import React from "react";

function ButtonPage() {
  return (
    <center>
      <>
        <a href="registerClient" variant="register" class="btn btn-info crud" size="lg" active>
          Register
        </a>
        <a href="clientInfo" variant="update" class="btn btn-info crud" size="lg" active>
          Update
        </a>
        <a href="deleteClient" variant="delete" class="btn btn-info crud" size="lg" active>
          Delete
        </a>
      </>
    </center>
  );
}
export default ButtonPage;
