
import Axios from 'axios';
import React, { Component } from 'react';
import ClientService from '../logic/client-service';

export default class UpdateList extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this); 
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.state = { currentClient: {id:null, firstName:null, lastName: null,email: null,licencePlate:null,phoneNumber:null }}
  }
  getClient =(id) =>{
    ClientService.getClient(id).then(Response => { 
      this.setState({
        currentClient:Response.data
      })
    } )
    .catch(e => {
      console.log(e)
    })
  }
  updateClient = () => {
    ClientService.updateClient(this.state.currentClient.id, this.state.currentClient).then(Response => {
      console.log(Response.data)
    })
    .catch(e => {
      console.log(e);
    })
  }
  handleChange =(e) =>{
    e.preventDefault();
      const a = [e.target.id];
      const b = [e.target.value];

    this.setState(
      {currentClient: b}
    )
      // this.setState( function(prevState){
      //   return {
      //     currentClient:{...prevState.currentClient,b},
      //      id: a
      //   }
      // })
  }
  componentDidMount(){
    this.getClient(this.props.match.params.id)
  }

}

