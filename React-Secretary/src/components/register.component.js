import React, { Component } from "react";
import ClientDataService from "../logic/ClientDataService";
import { Link } from "react-router-dom";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import validator from 'validator';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

const vname = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};
const vplate = value => {
    if (value.length < 3 || value.length > 8) {
        return (
            <div className="alert alert-danger" role="alert">
                The license plate must be between 3 and 8 characters.
            </div>
        );
    }
};
const vPhoneNumber = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addClient = this.addClient.bind(this);
        this.state = {
            currentClient: {
                firstName: "",
                lastName: "",
                email: "",
                licensePlate: "",
                phoneNumber: ""
            },
            message: ""
        };
    }

    handleChange = (e) => {
            this.setState(prevState => ({
                currentClient: {
                    ...prevState.currentClient,
                    [e.target.id]: e.target.value
                }
            }));
    }

    addClient = () => {
        const data = {
            firstName: this.state.currentClient.firstName,
            lastName: this.state.currentClient.lastName,
            email: this.state.currentClient.email,
            licensePlate: this.state.currentClient.licensePlate,
            phoneNumber: this.state.currentClient.phoneNumber
        };

        if (this.state.currentClient.firstName !== undefined && this.state.currentClient.lastName !== undefined && this.state.currentClient.email !== undefined && this.state.currentClient.licensePlate !== undefined && this.state.currentClient.phoneNumber !== undefined) {
            ClientDataService.postClient(data)
                .then(response => {
                    this.setState({
                        currentClient: {
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                            licensePlate: response.data.licensePlate,
                            phoneNumber: response.data.phoneNumber
                        },
                        message: "Client Added!"

                    });

                    console.log(response.data);
                })
                .then(() => {
                    this.props.history.push('/clients')
                })

                .catch(e => {
                    console.log(e);
                });
        }
        else {
            alert("there is an invalid data input")
        }
    }

    render() {
        return (
            <div>
                <span className="h3">
                    <h1 id={"title"}>Register Client</h1>
                    <hr style={{ backgroundColor: "#6aa5b3" }} />
                    <br />
                    <center>
                        <div className="col-12 col-lg-4 mt-2 hv-center">
                            <Form>
                                <div className="form-group text-left">
                                    <Input
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="firstName"
                                        placeholder="First Name"
                                        validations={[required, vname]}
                                    />
                                </div>
                                <div className="form-group text-left">
                                    <Input onChange={this.handleChange} className="form-control" id="lastName" placeholder="Last Name" validations={[required, vname]} />
                                </div>
                                <div className="form-group text-left">
                                    <Input onChange={this.handleChange} className="form-control" id="licensePlate" placeholder="License Plate" validations={[required, vplate]} />
                                </div>
                                <div className="form-group text-left">
                                    <Input onChange={this.handleChange} type="tel" className="form-control" id="phoneNumber" placeholder="Phone Number" validations={[required, vPhoneNumber]} />
                                </div>
                                <div className="form-group text-left">
                                    <Input onChange={this.handleChange} type="email" className="form-control" id="email" placeholder="Email" validations={[required, email]} />
                                </div>

                                <a onClick={this.addClient} className="btn btn-info" role="button" style={{ backgroundColor: "#ff6a00" }}>Register Client</a>

                                <br />
                            </Form>
                        </div>
                    </center>
                </span>
                <br />
                <p>{this.state.message}</p>
            </div>
        )
    }


}
export default Register;

