import React from 'react';
import ClientDataService from "../logic/ClientDataService";
import { Link } from "react-router-dom";

class Table extends React.Component{

  constructor(props) {
    super(props);
    this.state = {clients: []};
    this.retrieveClients = this.retrieveClients.bind(this);
  }

  componentDidMount () {
      this.retrieveClients();
  }

    retrieveClients() {
        ClientDataService.getAll()
            .then(response => {
                this.setState({
                    clients: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    deleteClient = (id) => {
      if(window.confirm('Are you sure?')) {
          ClientDataService.deleteClient(id)
              .then(response => {
                  console.log(response.data);
              })
              .catch(e => {
                  console.log(e);
              });
          this.retrieveClients();
          window.location.reload(false);
      }
  }

  emailClient = (id) =>{
      alert('not implemented');
  }

  render(){
  return (
    <center>
    <table className="tableClients">
      <thead>
        <tr>
          <th className="tableHeader">First Name</th>
          <th className="tableHeader">Last Name</th>
          <th className="tableHeader">License Plate</th>
          <th className="tableHeader">Email</th>
          <th className="tableHeader">Phone Number</th>
        </tr>
      </thead>
      <tbody>
      { (this.state.clients.length > 0) ? this.state.clients.map( (client, index) => {
           return (
            <tr key={ index }>
                <td>{ client.firstName }</td>
                <td>{ client.lastName }</td>
                <td>{ client.licensePlate}</td>
                <td>{ client.email }</td>
                <td>{ client.phoneNumber }</td>
                <td><center><button onClick={() => this.emailClient(client.id)} className="btn btn-info">Email</button></center></td>
                <td><center><button className="btn btn-warning">
                    <Link to={"/updateClient"} className="nav-link">
                        Update
                    </Link></button></center>
                </td><td><center><button onClick={() => this.deleteClient(client.id)} className="btn btn-danger">Delete</button></center></td>


            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>
    </center>
  );
  }
}

export default Table