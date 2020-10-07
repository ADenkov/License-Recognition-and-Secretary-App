import React from "react";
import "../App.css";
//import Clients from "./components/Client";
import Table from './components/table.component.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export class ClientInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = { clients: [] };
  }

  componentDidMount() {
    fetch("http://localhost:8080/clients/all").then(response => {
      response.json().then(clients => this.setState({ clients: clients }))
      console.log(response);
    });
  }

  deleteClient = (id) => {
    if(window.confirm('Are you sure')) {
      let clients = this.state.clients.filter(client => {
          return client.id !== id
      });
      //Using some sort of fetch to display the deletion
      this.setState({
          clients: clients
      })
      fetch("http://localhost:8080/clients/delete/" + id, {
          method: 'DELETE',
          header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
      
    }
  }

  render() {
    if(this.state.clients.length === 0)
    return <div>kur</div>;
    else
    return (
      <Table clients={ this.state.clients } />  
         
    )
  }
  
}
export default ClientInfo;
