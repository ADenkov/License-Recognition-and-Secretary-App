import React, {Component} from 'react';
import ClientDataService from '../logic/ClientDataService';
import {BrowserRouter, Link, Redirect} from "react-router-dom";

export default class Update extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
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
        console.log(val + " " + tid)
    }

    updateClient = () =>{
        if(this.state.currentClient.firstName != "" || this.state.currentClient.lastName != "" || this.state.currentClient.licencePlate !="" || this.state.currentClient.phoneNumber.length == 9)
        {ClientDataService.updateClient(
            this.state.currentClient.id,
            this.state.currentClient
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    alert: "The client was updated successfully!"
                });
            })
            .then(()=>{
                this.props.history.push('/clients')
            })
            .catch(e => {
                console.log(e);
            });
        }
        else{
            alert("The input you gave is inorrect")
        }
            
    }

    render() {
        let { currentClient } = this.state;
        return(
            <div>
                <span className="h3">
                <h1>Update Client</h1>
                <hr/>
                <br/>
                <center>
                    <div className="col-12 col-lg-4 mt-2 hv-center">
                        <form>
                            <div className="form-group text-left">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="First Name"
                                    id="firstName"
                                    value={currentClient.firstName}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Last Name"
                                    id="lastName"
                                    value={currentClient.lastName}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="License Plate"
                                    id="licensePlate"
                                    value={currentClient.licensePlate}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Phone Number"
                                    id="phoneNumber"
                                    value={currentClient.phoneNumber}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Email"
                                    id="email"
                                    value={currentClient.email}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            
                            <Link to={"/clients"} className="btn btn-danger"  >
                                    Cancel
                            </Link>
                            <a onClick={this.updateClient} className="btn btn-warning" role="button" >
                               Update Client 
                            </a>
                            <br/>
                        </form>
                    </div>
                </center>{/*TODO center tag to div align center*/}
                </span>
                <p>{this.state.message}</p>
            </div>
        )
    }
}