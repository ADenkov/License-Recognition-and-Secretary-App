import React, {Component} from "react";
import Clients from "./components/Clients"

function DeleteClient({id}){
}

function DeleteClient() {
    return (
        <span className="h3">
            <h1>Update Client</h1>
            <hr></hr>
            <br></br>
            <center>
                <div className="col-12 col-lg-4 mt-2 hv-center">
                    <form>
                        <div className="form-group text-left">
                            <input
                                type="name"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group text-left">
                            <input
                                type="licensePlate"
                                className="form-control"
                                id="licensePlate"
                                placeholder="License Plate"
                            />

                        </div><div className="form-group text-left">
                            <input
                                type="phoneNr"
                                className="form-control"
                                id="phoneNr"
                                placeholder="Phone Number"
                            />

                        </div><div className="form-group text-left">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                            />

                        </div>
                        <a href=".\ButtonPage.js" class="btn btn-info" role="button">
                            Update Client
                        </a>
                        <br></br>
                    </form>
                </div>
            </center>
        </span>
    );
}
export default DeleteClient;
