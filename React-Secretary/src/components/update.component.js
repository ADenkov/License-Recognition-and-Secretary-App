import React, {Component} from 'react';
import ClientDataService from '../logic/client.service';
import {BrowserRouter, Link, Redirect} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validator from "validator";

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
        return(
            <div className="alert alert-danger" role="alert">
                {value} is not a valid email.
            </div>
        );
    }
};

const vname = value => {
    if (value.length < 1 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 1 and 20 characters.
            </div>
        );
    }
};
const vplate = value => {
    if (value.length < 3 || value.length > 8 || value.includes('-') || value.includes(' ')) {
        return (
            <div className="alert alert-danger" role="alert">
                The license plate must be between 3 and 8 characters and not contain dashes and whitespace.
            </div>
        );
    }
};
const vPhoneNumber = value => {
    if (value.length < 10 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                The phone number must be between 10 and 15 characters.
            </div>
        );
    }
};

export default class Update extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getClient = this.getClient.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
        currentClient:
            {
                id : null,
                firstName : "",
                lastName : "",
                email : "",
                licencePlate : "",
                phoneNumber : ""
            },
        message : ""
    };
  }

  componentDidMount()
  {
      this.getClient(this.props.match.params.id);
      this.setState(prevState => ({
          currentClient: {
              ...prevState.currentClient,
              id: this.props.match.params.id
          }
      }));
  }

  getClient = (id) =>{
    ClientDataService.getClient(id).then(response => {
      this.setState({
        currentClient: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e)
    });
  }

    handleChange = (e) => {
        const val = e.target.value;
        const tid = e.target.id;
        this.setState(prevState => ({
            currentClient: {
                ...prevState.currentClient,
                [tid]: val
            }
        }));
    }

    handleUpdate(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            ClientDataService.updateClient(
                this.state.currentClient.id,
                this.state.currentClient
            )
                .then(response => {
                    this.setState({
                        currentClient: {
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                            licensePlate: response.data.licensePlate,
                            phoneNumber: response.data.phoneNumber
                        },
                        message: response.data.message,
                        successful: true
                    });

                    console.log(response.data);
                })
                .then(() => {
                    this.props.history.push('/clients')
                })
                .catch(error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                });
        }
    }
    render() {
        return(
            <div className="container" style={{width:"60vw", color:"#6aa5b3"}}>
                <h1 id={"title"}>Update Client</h1>
                <hr style={{ backgroundColor: "#6aa5b3" }} />

                <Form
                    onSubmit={this.handleUpdate}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                        <div>
                            <div className="form-group">
                                <span className="input-group-addon"><i className="fa fa-user">First Name</i></span>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    id="firstName"
                                    value={this.state.currentClient.firstName}
                                    onChange={this.handleChange}
                                    validations={[required, vname]}
                                />
                            </div>
                            <div className="form-group">
                                <span className="input-group-addon"><i className="fa fa-user">Last Name</i></span>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    id="lastName"
                                    value={this.state.currentClient.lastName}
                                    onChange={this.handleChange}
                                    validations={[required, vname]}
                                />
                            </div>

                            <div className="form-group">
                                <span className="input-group-addon"><i className="fa fa-envelope">Email</i></span>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    value={this.state.currentClient.email}
                                    onChange={this.handleChange}
                                    validations={[required, email]}
                                />
                            </div>

                            <div className="form-group">
                                <span className="input-group-addon"><i className="fa fa-home">License Plate (without dashes and/or whitespace)</i></span>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="licensePlate"
                                    id="licensePlate"
                                    value={this.state.currentClient.licensePlate}
                                    onChange={this.handleChange}
                                    validations={[required, vplate]}
                                />
                            </div>

                            <div className="form-group">
                                <span className="input-group-addon"><i className="fa fa-phone">Phone number</i></span>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={this.state.currentClient.phoneNumber}
                                    onChange={this.handleChange}
                                    validations={[required, vPhoneNumber]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-info" style={{ backgroundColor: "#ff6a00", border:"none" }}>Update Client</button>
                            </div>
                        </div>
                    )}

                    {this.state.message && (
                        <div className="form-group">
                            <div
                                className={
                                    this.state.successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {this.state.message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        )
    }
}