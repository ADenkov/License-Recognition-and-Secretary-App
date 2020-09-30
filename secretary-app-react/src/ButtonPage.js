import React from "react";

function ButtonPage() {
  return (
    <center>
      <>
        <button variant="register" size="lg" active>
          Register
        </button>{" "}
        <button variant="update" size="lg" active>
          Update
        </button>
        <button variant="delete" size="lg" active>
          Delete
        </button>
      </>
    </center>
  );
}
export default ButtonPage;
