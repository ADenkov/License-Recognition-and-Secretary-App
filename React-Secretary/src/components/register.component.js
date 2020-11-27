import React, { Component } from "react";
import ClientDataService from "../logic/ClientDataService";
import {Link} from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addClient = this.addClient.bind(this);
        this.state = {
            currentClient:{
                firstName: "",
                lastName: "",
                email: "",
                licensePlate: "",
                phoneNumber: ""
            },
            message:""
        };
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addClient = () =>{
        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            licensePlate: this.state.licensePlate,
            phoneNumber: this.state.phoneNumber
        };
        
        //console.log(data);
        if(this.state.currentClient.firstName !== "" || this.state.currentClient.lastName != "" || this.state.currentClient.licencePlate != "" || this.state.currentClient.phoneNumber.length == 9)
       {
        ClientDataService.postClient(data)
            .then(response => {
                this.setState({
                    currentClient:{
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        licensePlate: response.data.licensePlate,
                        phoneNumber: response.data.phoneNumber
                    },
                    message:"Client Added!"
                    
                });
                
                console.log(response.data);
            })
            .then(()=>{
                this.props.history.push('/clients')
            })
            
            .catch(e => {
                console.log(e);
            });
        }
        else{
            alert("there is an invalid data input")
        }
    }

    render() {
        return (
            <div>
                <span className="h3">
                    <h1 id={"title"}>Register Client</h1>
                    <hr style={{backgroundColor:"#6aa5b3"}}/>
                    <br/>
                    <center>
                        <div className="col-12 col-lg-4 mt-2 hv-center">
                            <form>
                                <div className="form-group text-left">
                                    <input
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="firstName"
                                        placeholder="First Name"
                                    />
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
                               
                                <a onClick={this.addClient} className="btn btn-info" role="button" style={{backgroundColor:"#ff6a00"}}>Register Client</a>
                                
                                <br/>
                            </form>
                        </div>
                    </center>
                </span>
                <br/>
                <p>{this.state.message}</p>
            </div>
        )
    }


}
export default Register;

