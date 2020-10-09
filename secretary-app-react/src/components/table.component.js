import React from 'react';
class Table extends React.Component{

  constructor(props) {
    super(props);
        this.state = {clients: []};
  }

  componentDidMount() {
    fetch("http://localhost:8080/clients/all").then(response => {
  response.json().then( clients => this.setState({clients: clients}))
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
              <td><center><button onClick={() => this.deleteClient(client.id)} className="btn btn-danger">Delete</button></center></td> 
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