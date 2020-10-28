import React from "react";
import "./App.css";
import Clients from "./components/Clients"
import Register from "./logic/Register"

class App extends React.Component {

	state ={

	}

  constructor(props) {
    super(props);
		this.state = {clients: []};
  }

  componentDidMount() {
		fetch("https://heroku-secretary.herokuapp.com/clients/all").then(response => {
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
		fetch("https://heroku-secretary.herokuapp.com/clients/delete/" + id, {
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
		// fetch("https://heroku-secretary.herokuapp.com/clients/update/" + client.id,{method: 'PUT'})
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
				<Clients deleteClient={this.deleteClient} clients = {this.state.clients}/>
				<Register addClient={this.addClient}/>
				{/*<Update getClient = {this.getClient}/>*/}
				{/*<Router>*/}
				{/*	<div className="App">*/}
				{/*		<header className="App-header">*/}
				{/*			<Route path="/update" component={UpdatePage} />*/}
				{/*			<Route path="/btnPage" component={ButtonPage} />*/}
				{/*			<Route path="/clientInfo" component={ClientInfo} />*/}
				{/*			<Route path="/registerClient" component={RegisterClient} />*/}
				{/*			<Route path="/deleteClient" component={DeleteClient} />*/}
				{/*		</header>*/}
				{/*	</div>*/}
				{/*</Router>*/}
			</div>
		)
  }
}
export default App;


