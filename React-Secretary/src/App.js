import React from "react";
import "./App.css";
import RegisterClient from "./components/register.component"
import Header from "./layouts/Header"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Table from "./components/table.component";
import UpdateClient from "./components/update.component"
import IPCamera from "./components/upload-files.component";
import assignMeetingComponent from "./components/assignMeeting.component";
import calendarComponent from './components/calendar.component'

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
						<Route exact path="/ipCamera" component={IPCamera} />
						<Route exact path="/createAppointment/:id" component={assignMeetingComponent}/>
						<Route exact path="/calendarComponent" component={calendarComponent}/>
					</div>
				</Router>
			</div>
		)
  }
}
export default App;


