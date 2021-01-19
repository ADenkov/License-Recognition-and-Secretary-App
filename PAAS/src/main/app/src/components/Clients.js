import React from "react";
import App from "../App";


const Clients  = ({clients,deleteClient,getClient})=>{
    const list = clients.map(client =>{
        return(
            <div key ={client.key}>
                <div >{client.firstName}</div>
                <div>{client.lastName}</div>
                <div>{client.licensePlate}</div>
                <div>{client.phoneNumber}</div>
                <div>{client.email}</div>

                {/*<div><button onClick={()=> {getClient(client)}} className="btn btn-danger">Update</button></div>*/}
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

