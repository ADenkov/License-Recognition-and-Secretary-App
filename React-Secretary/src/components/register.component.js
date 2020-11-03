import React, { Component } from "react";
import App from "../App";
import  { Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom";


class Register extends Component {
    state = {
        firstName: null,
        lastName: null,
        email: null,
        licensePlate: null,
        phoneNumber: null
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.addClient(this.state);
        // console.log(JSON.stringify(this.state));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch('http://localhost:8080/clients/add', requestOptions)
            .then( () => window.location.href ='/' )
            


    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    addClient = (newClient) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newClient)
        };
        fetch('http://localhost/clients/add', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ client: data.id }));
    }

    componentDidMount() {
        fetch("http://localhost:8080/clients/all").then(response => {
            response.json().then(clients => this.setState({ clients: clients }))
        });

    }

    addClient = (client) => {
        client.key = Math.random();
        let clients = [...this.state.clients, client]
        this.setState({
            clients: clients
        })
    }

    render() {
        return (
            <div>
                <span className="h3">
                    <h1>Register Client</h1>
                    <hr></hr>
                    <br></br>
                    <center>
                        <div className="col-12 col-lg-4 mt-2 hv-center">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group text-left">
                                    <input onChange={this.handleChange} className="form-control" id="firstName" placeholder="First Name" />
                                </div>
                                <div className="form-group text-left">
                                    <input onChange={this.handleChange} className="form-control" id="lastName" placeholder="Last Name" />
                                </div>
                                <div className="form-group text-left">
                                    <input onChange={this.handleChange} className="form-control" id="licensePlate" placeholder="License Plate" />
                                </div>
                                <div className="form-group text-left">
                                    <input onChange={this.handleChange} type="tel" className="form-control" id="phoneNumber" placeholder="Phone Number" />
                                </div>
                                <div className="form-group text-left">
                                    <input onChange={this.handleChange} type="email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <a onClick={this.handleSubmit} className="btn btn-info" role="button">Register Client</a>
                                <br></br>
                            </form>
                        </div>
                    </center>
                </span>
                <br></br>
            </div>
        )
    }


}
export default Register;

