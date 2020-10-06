import React from 'react';
import Clients from './Clients';
//import ClientInfo from "./ClientInfo";


class DeleteClient extends React.Component {

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

        
	render() {
		return (
			// <ClientList clients={this.state.clients}/>
			<Clients deleteClient={this.deleteClient} clients = {this.state.clients}/>
		)
  }
}

export default DeleteClient;
