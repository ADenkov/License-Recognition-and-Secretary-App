import React from 'react';

const Table = ({ clients }) => {
  return (
    <center>
    <table className="tableClients">
      <thead>
        <tr>
          <th class="tableHeader">First Name</th>
          <th class="tableHeader">Last Name</th>
          <th class="tableHeader">License Plate</th>
          <th class="tableHeader">Email</th>
          <th class="tableHeader">Phone Number</th>
        </tr>
      </thead>
      <tbody>
      { (clients.length > 0) ? clients.map( (client, index) => {
           return (
            <tr key={ index }>
              <td>{ client.firstName }</td>
              <td>{ client.lastName }</td>
              <td>{ client.licensePlate}</td>
              <td>{ client.email }</td>
              <td>{ client.phoneNumber }</td>
              <td><Clients deleteClient={this.deleteClient} clients = {this.state.clients}/></td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>
    </center>
  );
}

export default Table