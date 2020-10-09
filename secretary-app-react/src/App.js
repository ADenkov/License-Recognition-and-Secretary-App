import React from "react";
import "./App.css";
import Clients from "./components/Client"
import ClientInfo from "./components/ClientInfo"
import RegisterClient from "./components/register.component"
import ButtonPage from "./ButtonPage"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class App extends React.Component {

	state ={

	}

  constructor(props) {
    super(props);
		this.state = {clients: []};
  }

  componentDidMount() {
		fetch("http://localhost:8080/clients/all").then(response => {
      response.json().then( clients => this.setState({clients: clients}))
		});

	}
	addClient = (client) =>{
		client.key=Math.random();
  	let clients = [...this.state.clients, client]
		this.setState({
			clients: clients
		})
	}
	deleteClient = (id) => {
  	if(window.confirm('Are you sure')) {
		let clients = this.state.clients.filter(client => {
			return client.id !== id
		});
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

	//getClient = (client) => {
			// let clients = this.state.clients.filter(client => {
			// 	return client
			// });
		// fetch("http://localhost:8080/clients/update/" + client.id,{method: 'PUT'})
		// 	.then(response => response.json())
		// 	.then(data => client = data)
		// 	.then( clients => this.setState({clients: clients}))
		// 	function refreshPage(){
		// 	window.location.reload(false);
		// 	}
			// let clients = this.state.clients.map((client) => {
			// 	if(client.id == id) {
			// 		this.setState({
			// 			_Client: client
			// 		})
			// 		return client;
			// 	}
			// })
		//
		// this.setState(
		// 	clients:
		// )
		//}

	render() {
		return (
			<div>
				{/* <Clients deleteClient={this.deleteClient} clients = {this.state.clients}/>
				<Register addClient={this.addClient}/> */}
				{/*<Update getClient = {this.getClient}/>*/}
				<Router>
					<div className="App">
						<header className="App-header">
							<Route exact path="/" component={ButtonPage} />
							{/* <Route path="/update" component={UpdatePage} /> */}
							<Route path="/clientsInfo" component={ClientInfo} />
							<Route path="/registerClient" component={RegisterClient} />
						</header>
					</div>
				</Router>
			</div>
		)
  }
}
export default App;


