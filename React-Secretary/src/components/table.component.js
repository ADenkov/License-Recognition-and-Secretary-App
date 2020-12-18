import React from 'react';
import ClientDataService from "../logic/ClientDataService";
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

class TableComponent extends React.Component{

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

  emailClient = (email) => {
      ClientDataService.sendEmail(email)
          .then(response => {
              alert(response.data);
          })
          .catch(e => {
              alert('Error sending email, check if the email is correct');
              console.log(e);
          });
  }

  render(){
  return (
      <center>
    <table className="zui-table zui-table-rounded" style={{width:"70%"}} >
    <thead>
      <tr>
      <th className="tableHeader">First Name</th>
          <th className="tableHeader">Last Name</th>
          <th className="tableHeader">License Plate</th>
          <th className="tableHeader">Email</th>
          <th className="tableHeader">Phone Number</th>
          <th className="tableHeader"></th>
          <th className="tableHeader"></th>
          <th className="tableHeader"></th>

        </tr>
      </thead>
      <tbody>
      { (this.state.clients.length > 0) ? this.state.clients.map( (client, index) => {
           return (
            <tr key={ index }>
                <td className="tableCol">{ client.firstName }</td>
                <td className="tableCol">{ client.lastName }</td>
                <td className="tableCol">{ client.licensePlate}</td>
                <td className="tableCol">{ client.email }</td>
                <td className="tableCol">{ client.phoneNumber }</td>
                <td className="tableCol"><center><button className="btn btn-info">
                    <Link style={{color:"#FFFFFF"}} to={"/createAppointment/" + client.id} >
                        Make Appointment
                    </Link>
                </button></center>
                </td>
                <td className="tableCol"><center><button className="btn btn-warning" onClick="window.location.href='/updateClient/' {{+ client.id}}">
                    <Link style={{color:"#FFFFFF"}} to={"/updateClient/" + client.id} >
                        Update
                    </Link></button></center>
                </td>
                <td className="tableCol"><center><button onClick={() => this.deleteClient(client.id)} className="btn btn-danger">Delete</button></center></td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>
    </center>
  );
  }
}

export default TableComponent