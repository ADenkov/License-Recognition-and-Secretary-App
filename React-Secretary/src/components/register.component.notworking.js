import React, { Component } from "react";
import ClientDataService from "../logic/ClientDataService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
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
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeLicensePlate=this.onChangeLicensePlate.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            licensePlate: "",
            email: "",
            phoneNumber: "",
            successful: false,
            message: ""
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeLicensePlate(e){
        this.setState({
            licensePlate: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            ClientDataService.postClient(
                this.state.firstName,
                this.state.lastName,
                this.state.licensePlate,
                this.state.phoneNumber,
                this.state.email
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
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
                }
            );
        }
    }

render() {
    return (
        <>
            <span className="h3">
                <h1 id={"title"}>Register Client</h1>
                <hr style={{ backgroundColor: "#6aa5b3" }} />
                <br />
                <center>
                    <div className="col-12 col-lg-4 mt-2 hv-center">
                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <span class="input-group-addon">First name</span>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.firstName}
                                            onChange={this.onChangeFirstName}
                                            validations={[required, vname]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <span class="input-group-addon">Last name</span>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.lastName}
                                            onChange={this.onChangeLastName}
                                            validations={[required, vname]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <span class="input-group-addon">License plate</span>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.licensePlate}
                                            onChange={this.onChangeLicensePlate}
                                            validations={[required, vplate]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <span class="input-group-addon">Email</span>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required, email]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <span class="input-group-addon">Phone Number</span>
                                        <Input
                                            type="phoneNumber"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={this.state.phoneNumber}
                                            onChange={this.onChangePhoneNumber}
                                            validations={[required, vPhoneNumber]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Sign Up</button>
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
                </center>
            </span>
            <br />
            <p>{this.state.message}</p>
        </>
    )
}}
export default Register;

