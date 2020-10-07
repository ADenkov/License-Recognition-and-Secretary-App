import React, {Component} from "react";

class Update extends Component{
    state ={
         //  client: this.props.getClient,
        id:1,
         firstName:null ,
         lastName:null ,
         email: null,
         licensePlate: null,
         phoneNumber: null
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]:e.target.value
        })
}
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
        this.props.getClient(this.state);
        console.log(this.state)
    }


    render() {
        return(

            <div>
                <span className="h3">
                <h1>Update Client</h1>
                <hr></hr>
                <br></br>
                <center>
       <div className="col-12 col-lg-4 mt-2 hv-center">
         <form onSubmit={this.handleSubmit}>
             <div className="form-group text-left">
             <input onChange = {this.handleChange} type="name" className="form-control" id="firstName" placeholder="Name"/>
             </div>
             <div className="form-group text-left">
                  <input onChange = {this.handleChange} type="name" className="form-control" id="lastName" placeholder="Name"/>
             </div>
                          <div className="form-group text-left">
                            <input onChange = {this.handleChange}
                                   type="licensePlate"
                                   className="form-control"
                                   id="licensePlate"
                                   placeholder="License Plate"
                            />

                          </div><div className="form-group text-left">
                            <input onChange = {this.handleChange}
                                   type="phoneNr"
                                   className="form-control"
                                   id="phoneNumber"
                                   placeholder="Phone Number"
                            />

                          </div><div className="form-group text-left">
                            <input onChange = {this.handleChange}
                                   type="email"
                                   className="form-control"
                                   id="email"
                                   placeholder="Email"
                            />

                          </div>
                          <a onClick={this.handleSubmit} className="btn btn-info" role="button">
                            Update Client
                          </a>
                          <br></br>
                        </form>
                      </div>
                       </center>
                     </span>
            </div>
        )
    }


}
export default Update;

