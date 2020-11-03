import React from "react";
import App from "../App";


const Clients  = ({clients,deleteClient})=>{
    // handleUpdateOperation = (e) => {
    //
    // }
    const list = clients.map(client =>{
        return(
            <div key ={client.id}>
                {/*<td>{client.id}</td>*/}
                <div >{client.firstName}</div>
                <div>{client.lastName}</div>
                <div>{client.licensePlate}</div>
                <div>{client.phoneNumber}</div>
                <div>{client.email}</div>
                {/*<form onClick={this.handleUpdateOperation}>*/}
                {/*    <button className="btn btn-danger">Update</button>*/}
                {/*</form>*/}
                {/*<form onClick={()=> {deleteClient(client.id)}}>*/}
                {/*    <button className="btn btn-danger">Delete</button>*/}
                {/*</form>*/}
                <div><button onClick={()=> {deleteClient(client.id)}} className="btn btn-danger">Delete</button></div>
            </div>

        )
    })
    return(
    <div>
        {list}
    </div>
    )
}

export default Clients;

