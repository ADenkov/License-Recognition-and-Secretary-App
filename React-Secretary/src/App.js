import React from "react";
import "./App.css";
import RegisterClient from "./components/register.component"
import Header from "./layouts/Header"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Table from "./components/table.component";
import UpdateClient from "./components/update.component"
import UploadImage from "./components/upload-files-component";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {clients: []};
	}

	render() {
		return (
			<div>
				<Router>
					<div className="App">
						<Header />
						<Route exact path="/" component={RegisterClient} />
						<Route exact path="/clients" component={Table} />
						<Route exact path="/updateClient/:id" component={UpdateClient} />
						<Route exact path="/registerClient" component={RegisterClient} />
						<Route exact path="/uploadImage" component={UploadImage} />
					</div>
				</Router>
			</div>
		)
  }
}
export default App;


